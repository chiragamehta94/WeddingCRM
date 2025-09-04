/* WeddingCRM v6 - ENHANCED Element Sheet with File Upload + Auto-save */
(function(){
  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];

  const KEYS = { clients:'clients', projects:'projects', designs:'designs', events:'events' };
  const state = { 
    clients: load(KEYS.clients, []), 
    projects: load(KEYS.projects, []), 
    designs: load(KEYS.designs, []), 
    events: load(KEYS.events, []), 
    monthOffset:0,
    activeProjectId: null
  };

  function load(key, fallback){ 
    try{ return JSON.parse(localStorage.getItem(key)) ?? fallback }catch{return fallback} 
  }

  function save(key, v){ 
    localStorage.setItem(key, JSON.stringify(v)) 
  }

  function persistAll(){ 
    save(KEYS.clients, state.clients); 
    save(KEYS.projects, state.projects); 
    save(KEYS.designs, state.designs); 
    save(KEYS.events, state.events); 
  }

  function uid(){ 
    return Math.random().toString(36).slice(2,9) 
  }

  function toast(msg, t=2200){ 
    const el=$('#toast'); 
    el.textContent=msg; 
    el.hidden=false; 
    clearTimeout(el._to); 
    el._to=setTimeout(()=>el.hidden=true,t) 
  }

  // Date formatting utility function
  function formatDateDisplay(dateStr) {
    if (!dateStr) return '';

    // If date is already in DD-MM-YYYY format, return as is
    if (dateStr.includes('-') && dateStr.split('-').length === 3) {
      const parts = dateStr.split('-');
      if (parts[0].length === 4) {
        // YYYY-MM-DD format, convert to DD-MM-YYYY
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      } else if (parts[0].length === 2) {
        // Already DD-MM-YYYY format
        return dateStr;
      }
    }

    // Try to parse as Date object
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    } catch (e) {
      // If parsing fails, return original string
    }

    return dateStr;
  }

  // ENHANCED: Auto-save Element Sheet Function
  let autoSaveTimeout;
  function autoSaveElementSheet() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      const textarea = $('#element-sheet-text');
      const indicator = $('#auto-save-indicator');
      
      if (!textarea) return;
      
      const project = state.projects.find(p => p.id === state.activeProjectId);
      if (!project) return;
      
      project.elementSheetText = textarea.value;
      persistAll();
      
      // Show auto-save indicator
      if (indicator) {
        indicator.classList.add('visible');
        setTimeout(() => {
          indicator.classList.remove('visible');
        }, 2000);
      }
      
      console.log('✅ Element Sheet auto-saved');
    }, 800); // Auto-save after 800ms of no typing
  }

  // NEW: File Upload Functions for Element Sheet
  function uploadElementFiles() {
    const fileInput = $('#element-file-input');
    if (!fileInput || fileInput.files.length === 0) {
      toast('Please select files to upload');
      return;
    }

    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) {
      toast('Project not found');
      return;
    }

    if (!project.elementFiles) project.elementFiles = [];

    const files = Array.from(fileInput.files);
    let processedCount = 0;

    files.forEach(file => {
      // Validate file types
      const allowedTypes = ['.xlsx', '.xls', '.doc', '.docx', '.pdf'];
      const fileExt = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExt)) {
        toast(`File "${file.name}" is not a supported format`);
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast(`File "${file.name}" is too large (max 10MB)`);
        return;
      }

      fileToDataURL(file)
        .then(dataUrl => {
          project.elementFiles.push({
            id: uid(),
            name: file.name,
            type: file.type,
            size: file.size,
            src: dataUrl,
            uploadDate: new Date().toISOString()
          });

          processedCount++;
          if (processedCount === files.length) {
            persistAll();
            renderElementFiles();
            toast(`${processedCount} file(s) uploaded successfully`);
            fileInput.value = '';
          }
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          toast(`Error uploading "${file.name}"`);
        });
    });
  }

  function renderElementFiles() {
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;

    if (!project.elementFiles) project.elementFiles = [];

    const container = $('#element-uploaded-files');
    if (!container) return;

    container.innerHTML = '';

    if (project.elementFiles.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 12px; font-size: 13px;">No files uploaded yet</p>';
      return;
    }

    project.elementFiles.forEach((file, index) => {
      const fileEl = document.createElement('div');
      fileEl.className = 'uploaded-file-item';

      const fileIcon = getFileIcon(file.name);
      
      fileEl.innerHTML = `
        <div class="file-info">
          <span class="file-icon">${fileIcon}</span>
          <span style="font-weight: 500;">${escapeHTML(file.name)}</span>
          <span style="color: #6b7280; margin-left: 8px;">(${formatFileSize(file.size)})</span>
        </div>
        <button class="action warn" onclick="removeElementFile(${index})" style="font-size: 11px; padding: 4px 8px;">Remove</button>
      `;

      container.appendChild(fileEl);
    });
  }

  function getFileIcon(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case 'xlsx':
      case 'xls': return '📊';
      case 'doc':
      case 'docx': return '📄';
      case 'pdf': return '📕';
      default: return '📎';
    }
  }

  function removeElementFile(index) {
    if (!confirm('Remove this file? This cannot be undone.')) return;

    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project || !project.elementFiles) return;

    project.elementFiles.splice(index, 1);
    persistAll();
    renderElementFiles();
    toast('File removed');
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // ENHANCED: Payment Status Management Functions
  function clearValidationErrors(form) {
    // Remove error styling from all fields
    const fields = form.querySelectorAll('input, select');
    fields.forEach(field => {
      field.style.borderColor = '';
      field.style.backgroundColor = '';
    });

    // Remove all error messages
    const errorMessages = form.querySelectorAll('.validation-error');
    errorMessages.forEach(error => error.remove());

    // Remove any status preview boxes
    const statusPreviews = form.querySelectorAll('#status-preview');
    statusPreviews.forEach(preview => preview.remove());
  }

  function showValidationError(field, message) {
    // Add error styling to field
    field.style.borderColor = 'var(--bad)';
    field.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';

    // Remove any existing error message
    const existingError = field.parentNode.querySelector('.validation-error');
    if (existingError) existingError.remove();

    // Add error message
    const errorEl = document.createElement('div');
    errorEl.className = 'validation-error';
    errorEl.style.color = 'var(--bad)';
    errorEl.style.fontSize = '12px';
    errorEl.style.marginTop = '4px';
    errorEl.textContent = message;
    field.parentNode.appendChild(errorEl);
  }

  // ENHANCED: Real-time Payment Status Updates
  function updatePaymentStatus(form) {
    const finalAmount = Number(form.finalAmount?.value || 0);
    const advanceAmount = Number(form.advance?.value || 0);

    // Clear previous validation errors
    clearValidationErrors(form);

    // Validation: Check if advance exceeds final amount
    if (advanceAmount > finalAmount && finalAmount > 0) {
      showValidationError(form.advance, `Advance payment (₹${advanceAmount.toLocaleString('en-IN')}) cannot exceed final amount (₹${finalAmount.toLocaleString('en-IN')})`);
      return; // Don't update status if invalid
    }

    // Auto-update payment status based on valid amounts
    let newStatus = 'Pending';
    if (advanceAmount === 0) {
      newStatus = 'Pending';
    } else if (advanceAmount >= finalAmount && finalAmount > 0) {
      newStatus = 'Completed';
    } else if (advanceAmount > 0) {
      newStatus = 'Partial';
    }

    // Update the select field
    form.paymentStatus.value = newStatus;

    // Show status preview with enhanced messaging
    const statusContainer = form.querySelector('#status-preview') || createStatusPreview(form);
    if (statusContainer && finalAmount > 0) {
      statusContainer.style.display = 'block';
      const remaining = finalAmount - advanceAmount;
      
      if (newStatus === 'Completed') {
        statusContainer.innerHTML = '✅ <strong>Payment Status:</strong> Completed (Full payment received)';
        statusContainer.style.background = 'rgba(34, 197, 94, 0.1)';
        statusContainer.style.borderColor = 'rgba(34, 197, 94, 0.3)';
        statusContainer.style.color = '#15803d';
      } else if (newStatus === 'Partial') {
        statusContainer.innerHTML = `🟡 <strong>Payment Status:</strong> Partial (₹${remaining.toLocaleString('en-IN')} remaining)`;
        statusContainer.style.background = 'rgba(245, 158, 11, 0.1)';
        statusContainer.style.borderColor = 'rgba(245, 158, 11, 0.3)';
        statusContainer.style.color = '#b45309';
      } else {
        statusContainer.innerHTML = '💰 <strong>Payment Status:</strong> Pending (No advance received)';
        statusContainer.style.background = 'rgba(107, 114, 128, 0.1)';
        statusContainer.style.borderColor = 'rgba(107, 114, 128, 0.3)';
        statusContainer.style.color = '#6b7280';
      }
    }
  }

  function createStatusPreview(form) {
    const preview = document.createElement('div');
    preview.id = 'status-preview';
    preview.style.cssText = 'padding:8px 12px;border-radius:6px;margin-top:8px;font-size:12px;font-weight:600;border:1px solid;display:none;';
    form.appendChild(preview);
    return preview;
  }

  // Navigation
  function setActiveTab(name){
    $$('.tab-btn').forEach(b=> b.classList.toggle('active', b.dataset.tab===name));
    $$('.tab').forEach(s=> s.classList.toggle('active', s.id===name));
    location.hash = '#'+name;
    renderAll();
  }

  function initNavigation(){
    const initial = (location.hash && location.hash.slice(1)) || 'dashboard';
    setActiveTab(initial);
    window.addEventListener('hashchange', ()=>{
      const name=(location.hash && location.hash.slice(1))||'dashboard';
      $$('.tab-btn').forEach(b=> b.classList.toggle('active', b.dataset.tab===name));
      $$('.tab').forEach(s=> s.classList.toggle('active', s.id===name));
      renderAll();
    });
  }

  // Dashboard Widget Navigation
  document.addEventListener('click', (e) => {
    const widget = e.target.closest('.clickable-stat');
    if (widget) {
      const navigateTo = widget.dataset.navigate;
      if (navigateTo) {
        setActiveTab(navigateTo);
        toast(`Navigated to ${navigateTo.charAt(0).toUpperCase() + navigateTo.slice(1).replace('-', ' ')}`);
      }
    }
  });

  // Global search and filters
  $('#global-search').addEventListener('input', ()=>{
    renderClients();
    renderProjects();
    renderDesigns();
    renderPendingPayments();
  });

  // Auto-save functionality for Element Sheet
  document.addEventListener('input', (e) => {
    if (e.target.id === 'element-sheet-text') {
      autoSaveElementSheet();
    }
  });

  // Populate filter dropdowns with unique values
  function populateClientFilters() {
    // Get unique values for each filter
    const uniqueWeddingDates = [...new Set(state.clients.map(c => c.weddingDate).filter(d => d))].sort();
    const uniqueVenues = [...new Set(state.clients.map(c => c.venue).filter(v => v))].sort();
    const uniqueFollowupDates = [...new Set(state.clients.map(c => c.followUp).filter(d => d))].sort();
    const uniqueMeetingDates = [...new Set(state.clients.map(c => c.meetingDate).filter(d => d))].sort();

    // Populate Wedding Date filter
    const weddingDateFilter = $('#clients-wedding-date-filter');
    if (weddingDateFilter) {
      weddingDateFilter.innerHTML = '<option value="all">All Wedding Dates</option>';
      uniqueWeddingDates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = formatDateDisplay(date);
        weddingDateFilter.appendChild(option);
      });
    }

    // Populate Venue filter
    const venueFilter = $('#clients-venue-filter');
    if (venueFilter) {
      venueFilter.innerHTML = '<option value="all">All Venues</option>';
      uniqueVenues.forEach(venue => {
        const option = document.createElement('option');
        option.value = venue;
        option.textContent = venue;
        venueFilter.appendChild(option);
      });
    }

    // Populate Follow-up Date filter
    const followupDateFilter = $('#clients-followup-date-filter');
    if (followupDateFilter) {
      followupDateFilter.innerHTML = '<option value="all">All Follow-up Dates</option>';
      uniqueFollowupDates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = formatDateDisplay(date);
        followupDateFilter.appendChild(option);
      });
    }

    // Populate Meeting Date filter
    const meetingDateFilter = $('#clients-meeting-date-filter');
    if (meetingDateFilter) {
      meetingDateFilter.innerHTML = '<option value="all">All Meeting Dates</option>';
      uniqueMeetingDates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = formatDateDisplay(date);
        meetingDateFilter.appendChild(option);
      });
    }
  }

  // Add event listeners for all client filters
  function initClientFilters() {
    const filters = [
      'clients-status-filter',
      'clients-wedding-date-filter', 
      'clients-venue-filter',
      'clients-followup-date-filter',
      'clients-meeting-date-filter'
    ];

    filters.forEach(filterId => {
      const filterEl = $('#' + filterId);
      if (filterEl) {
        filterEl.addEventListener('change', renderClients);
      }
    });

    // Clear all filters button
    const clearFiltersBtn = $('#clear-all-filters');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        filters.forEach(filterId => {
          const filterEl = $('#' + filterId);
          if (filterEl) filterEl.value = 'all';
        });
        renderClients();
        toast('All filters cleared');
      });
    }
  }

  // Header buttons
  document.body.addEventListener('click', (e)=>{
    const btn = e.target.closest('button');
    const act = e.target.closest('[data-act]');
    if(act){
      const a=act.dataset;
      handleAction(a.act,a.id);
      return;
    }
    if(!btn) return;

    if(btn.id==='add-client'||btn.id==='quick-add-client'){
      openClientModal();
      return;
    }
    if(btn.id==='add-project'){
      openProjectModal();
      return;
    }
    if(btn.id==='add-design'){
      openDesignModal();
      return;
    }
    if(btn.id==='add-event'||btn.id==='quick-add-event'){
      openEventModal();
      return;
    }
    if(btn.id==='prev-month'){
      state.monthOffset--;
      renderCalendar();
      return;
    }
    if(btn.id==='next-month'){
      state.monthOffset++;
      renderCalendar();
      return;
    }
    if(btn.id==='export-receivables'){
      exportReceivables();
      return;
    }
    if(btn.id==='export-client-data'){
      exportClientData();
      return;
    }
    if(btn.id==='project-detail-close'){
      $('#project-detail-modal').close();
      return;
    }
    // NEW: Element sheet file upload
    if(btn.id==='upload-element-files'){
      uploadElementFiles();
      return;
    }
    if(btn.id==='export-element-sheet-word'){
      exportElementSheetAsWord();
      return;
    }
    if(btn.id==='clear-element-sheet'){
      clearElementSheet();
      return;
    }
  });

  // Core renderers with multiple filters and DD-MM-YYYY date format
  function renderClients(){
    const tbody=$('#clients-table tbody');
    tbody.innerHTML='';
    const q=$('#global-search').value.trim().toLowerCase();

    // Get filter values
    const statusFilter = $('#clients-status-filter')?.value || 'all';
    const weddingDateFilter = $('#clients-wedding-date-filter')?.value || 'all';
    const venueFilter = $('#clients-venue-filter')?.value || 'all';
    const followupDateFilter = $('#clients-followup-date-filter')?.value || 'all';
    const meetingDateFilter = $('#clients-meeting-date-filter')?.value || 'all';

    const items=state.clients.filter(c=>{
      // Status filter
      if(statusFilter !== 'all' && c.status !== statusFilter) return false;

      // Wedding date filter
      if(weddingDateFilter !== 'all' && c.weddingDate !== weddingDateFilter) return false;

      // Venue filter
      if(venueFilter !== 'all' && c.venue !== venueFilter) return false;

      // Follow-up date filter
      if(followupDateFilter !== 'all' && c.followUp !== followupDateFilter) return false;

      // Meeting date filter
      if(meetingDateFilter !== 'all' && c.meetingDate !== meetingDateFilter) return false;

      // Global search filter
      if(!q) return true;
      return (c.name||'').toLowerCase().includes(q)||(c.phone||'').toLowerCase().includes(q)||(c.venue||'').toLowerCase().includes(q);
    });

    items.forEach(c=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${escapeHTML(c.name)}</td><td>${escapeHTML(c.phone)}</td><td>${formatDateDisplay(c.weddingDate)}</td><td>${escapeHTML(c.venue)}</td><td><span class="badge ${labelStatus(c.status)}">${escapeHTML(c.status)}</span></td><td>${formatDateDisplay(c.followUp)}</td><td>${formatDateDisplay(c.meetingDate)}</td><td class="notes-cell">${escapeHTML(c.notes||'—')}</td><td><button class="action" data-act="edit-client" data-id="${c.id}">Edit</button> <button class="action warn" data-act="del-client" data-id="${c.id}">Delete</button></td>`;
      tbody.appendChild(tr);
    });

    // Show filter count if any filters are active
    const activeFilters = [statusFilter, weddingDateFilter, venueFilter, followupDateFilter, meetingDateFilter].filter(f => f !== 'all').length;
    const totalClients = state.clients.length;
    const filteredClients = items.length;

    if (activeFilters > 0) {
      const clientsHeader = $('section#clients h2');
      if (clientsHeader) {
        clientsHeader.textContent = `Clients (${filteredClients} of ${totalClients} shown)`;
      }
    } else {
      const clientsHeader = $('section#clients h2');
      if (clientsHeader) {
        clientsHeader.textContent = 'Clients';
      }
    }
  }

  // UPDATED: labelStatus function for new status badge colors
  function labelStatus(s){
    if(s==='Confirmed') return 'good';          // Green
    if(s==='Follow Up Period') return 'primary'; // Light Lilac  
    if(s==='Enquiry') return 'muted';           // Light Yellow
    // Legacy support for old statuses
    if(s==='confirmed') return 'good';
    if(s==='booked') return 'primary';
    if(s==='inquiry') return 'muted';
    return 'muted';
  }

  function renderProjects(){
    const tbody=$('#projects-table tbody');
    tbody.innerHTML='';
    const q=$('#global-search').value.trim().toLowerCase();
    const items=state.projects.filter(p=>{
      if(!q) return true;
      const client=state.clients.find(c=>c.id===p.clientId);
      return (client?.name||'').toLowerCase().includes(q);
    });
    items.forEach(p=>{
      const client=state.clients.find(c=>c.id===p.clientId)||{};
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${escapeHTML(client.name||'—')}</td><td>₹${(p.finalAmount||0).toLocaleString('en-IN')}</td><td>₹${(p.advance||0).toLocaleString('en-IN')}</td><td><span class="badge ${labelStatus(p.paymentStatus)}">${escapeHTML(p.paymentStatus||'Pending')}</span></td><td><button class="action" data-act="open-project" data-id="${p.id}">View</button> <button class="action" data-act="edit-project" data-id="${p.id}">Edit</button> <button class="action warn" data-act="del-project" data-id="${p.id}">Delete</button></td>`;
      tbody.appendChild(tr);
    });
  }

  // Render Pending Payments Page
  function renderPendingPayments(){
    const tbody=$('#pending-payments-table tbody');
    if (!tbody) return; // Exit if not on pending payments page

    tbody.innerHTML='';
    const q=$('#global-search').value.trim().toLowerCase();

    // Filter projects with pending payments
    const pendingProjects=state.projects.filter(p=>{
      const balance = Math.max(0,(p.finalAmount||0)-(p.advance||0));
      return balance > 0; // Only show projects with pending balance
    }).filter(p=>{
      if(!q) return true;
      const client=state.clients.find(c=>c.id===p.clientId);
      return (client?.name||'').toLowerCase().includes(q);
    });

    pendingProjects.forEach(p=>{
      const client=state.clients.find(c=>c.id===p.clientId)||{};
      const balance = Math.max(0,(p.finalAmount||0)-(p.advance||0));
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${escapeHTML(client.name||'—')}</td><td>₹${(p.finalAmount||0).toLocaleString('en-IN')}</td><td>₹${(p.advance||0).toLocaleString('en-IN')}</td><td><strong style="color:var(--bad)">₹${balance.toLocaleString('en-IN')}</strong></td><td><span class="badge ${labelStatus(p.paymentStatus)}">${escapeHTML(p.paymentStatus||'Pending')}</span></td><td><button class="action" data-act="edit-project" data-id="${p.id}">Update Payment</button> <button class="action" data-act="open-project" data-id="${p.id}">View Details</button></td>`;
      tbody.appendChild(tr);
    });

    // Update the page title with count
    const pendingTitle = $('section#pending-payments h2');
    if (pendingTitle) {
      pendingTitle.textContent = `Pending Payments (${pendingProjects.length})`;
    }
  }

  function renderDesigns(){
    const grid=$('#designs-grid');
    grid.innerHTML='';
    const q=$('#global-search').value.trim().toLowerCase();
    const items=state.designs.filter(d=>{
      if(!q) return true;
      return (d.name||'').toLowerCase().includes(q)||(d.category||'').toLowerCase().includes(q);
    });
    items.forEach(d=>{
      const card=document.createElement('div');
      card.className='design-card';
      const imgs=(d.images||[]).map(src=>`<img src="${src}" alt="${escapeHTML(d.name)}">`).join('');
      card.innerHTML=`${imgs}<div class="meta"><h4>${escapeHTML(d.name)}</h4><p><strong>Category:</strong> ${escapeHTML(d.category)}</p><p>${escapeHTML(d.description||'')}</p><div class="actions"><button class="action" data-act="edit-design" data-id="${d.id}">Edit</button> <button class="action warn" data-act="del-design" data-id="${d.id}">Delete</button> <button class="action" data-act="download-design" data-id="${d.id}">Download</button></div></div>`;
      grid.appendChild(card);
    });
  }

  // Calendar with Client Integration and Modal Navigation
  function renderCalendar(){
    const cal=$('#calendar');
    cal.innerHTML='';
    const now=new Date();
    const year=now.getFullYear();
    const month=now.getMonth()+state.monthOffset;
    const currentDate = new Date(year, month, 1);

    // Update month/year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const monthDisplay = $('#calendar-month-display');
    if (monthDisplay) {
      monthDisplay.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }

    const firstDay=new Date(year,month,1);
    const lastDay=new Date(year,month+1,0);
    const startWeek=new Date(firstDay);
    startWeek.setDate(firstDay.getDate()-firstDay.getDay());

    // Add legend
    const legend = document.createElement('div');
    legend.className = 'legend';
    legend.innerHTML = `
      <div class="legend-item"><span class="dot wedding"></span><span>Wedding</span></div>
      <div class="legend-item"><span class="dot meeting"></span><span>Meeting</span></div>
      <div class="legend-item"><span class="dot follow"></span><span>Follow-up</span></div>
    `;
    cal.appendChild(legend);

    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-full';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(header => {
      const headerEl = document.createElement('div');
      headerEl.style.fontWeight = 'bold';
      headerEl.style.textAlign = 'center';
      headerEl.style.padding = '8px';
      headerEl.textContent = header;
      calendarGrid.appendChild(headerEl);
    });

    for(let week=0;week<6;week++){
      for(let day=0;day<7;day++){
        const current=new Date(startWeek);
        current.setDate(startWeek.getDate()+week*7+day);
        const dayEl=document.createElement('div');
        dayEl.className='day';
        if(current.getMonth()!==month) dayEl.style.opacity='0.3';
        dayEl.innerHTML=`<div class="date">${current.getDate()}</div>`;

        const dayStr=current.toISOString().slice(0,10);

        // Get all events for this date
        const allEvents = getEventsForDate(dayStr);

        allEvents.forEach(eventData=>{
          const badge=document.createElement('div');
          badge.className=`badge ${eventData.className} ${eventData.clickable ? 'clickable-event' : ''}`;
          badge.textContent=eventData.title;
          badge.title=eventData.tooltip || eventData.title;

          // Add click handler for client-related events
          if (eventData.clickable && eventData.clientId) {
            badge.style.cursor = 'pointer';
            badge.addEventListener('click', (e) => {
              e.stopPropagation();
              navigateToClientModal(eventData.clientId, eventData.eventType);
            });
          }

          dayEl.appendChild(badge);
        });

        calendarGrid.appendChild(dayEl);
      }
    }
    cal.appendChild(calendarGrid);
  }

  // Get all events for a specific date (manual events + client events)
  function getEventsForDate(dateStr) {
    const events = [];

    // 1. Manual events from events collection
    state.events.filter(e=>e.date===dateStr).forEach(e=>{
      events.push({
        title: e.title,
        className: badgeClass(e.type),
        tooltip: `${e.type}: ${e.title}`,
        clickable: false
      });
    });

    // 2. Client follow-up dates
    state.clients.filter(c=>c.followUp===dateStr).forEach(c=>{
      events.push({
        title: `Follow-up: ${c.name}`,
        className: 'follow',
        tooltip: `Follow-up with ${c.name} (${c.phone})`,
        clickable: true,
        clientId: c.id,
        eventType: 'follow-up'
      });
    });

    // 3. Client meeting dates
    state.clients.filter(c=>c.meetingDate===dateStr).forEach(c=>{
      events.push({
        title: `Meeting: ${c.name}`,
        className: 'meeting',
        tooltip: `Meeting with ${c.name} (${c.phone})`,
        clickable: true,
        clientId: c.id,
        eventType: 'meeting'
      });
    });

    // 4. Client wedding dates (event finalized)
    state.clients.filter(c=>c.weddingDate===dateStr).forEach(c=>{
      events.push({
        title: `Wedding: ${c.name}`,
        className: 'wedding',
        tooltip: `${c.name}'s Wedding at ${c.venue || 'TBD'}`,
        clickable: true,
        clientId: c.id,
        eventType: 'wedding'
      });
    });

    return events;
  }

  // Navigate to specific client/project modals instead of pages
  function navigateToClientModal(clientId, eventType) {
    const client = state.clients.find(c => c.id === clientId);
    if (!client) {
      toast('Client not found');
      return;
    }

    if (eventType === 'wedding') {
      // For wedding events, open the project detail modal
      const project = state.projects.find(p => p.clientId === clientId);
      if (project) {
        toast(`Opening ${client.name}'s wedding project details`);
        openProjectDetail(project.id);
      } else {
        toast(`${client.name} doesn't have a project yet`);
        // Optionally open client modal instead
        openClientModal(client);
      }
    } else {
      // For follow-up and meeting events, open client edit modal
      const eventTypeText = eventType === 'follow-up' ? 'follow-up' : 'meeting';
      toast(`Opening ${client.name}'s details for ${eventTypeText}`);
      openClientModal(client);
    }
  }

  function badgeClass(type){
    if(type==='wedding') return 'wedding';
    if(type==='meeting') return 'meeting';
    return 'follow';
  }

  // Dashboard rendering with DD-MM-YYYY date format in panels
  function renderDashboard(){
    // Only 3 widgets (no meeting/follow-up widgets)
    $('#total-clients .stat').textContent = state.clients.length;
    $('#active-projects .stat').textContent = state.projects.length;
    const pending = state.projects.filter(p=>p.paymentStatus!=='Completed').reduce((s,p)=> s + Math.max(0,(p.finalAmount||0)-(p.advance||0)), 0);
    $('#pending-payments .stat').textContent = '₹' + pending.toLocaleString('en-IN');

    // Render detailed panels with DD-MM-YYYY date format
    const futureMeetings = state.clients.filter(c=>c.meetingDate && new Date(c.meetingDate) >= new Date());
    const futureFollowups = state.clients.filter(c=>c.followUp && new Date(c.followUp) >= new Date());

    // Today's To-do List
    renderTodaysTodo();

    // Meeting reminders detailed list with DD-MM-YYYY format
    const ml=$('#meeting-reminders');
    if (ml) {
      ml.innerHTML='';
      futureMeetings.sort((a,b)=>(a.meetingDate||'').localeCompare(b.meetingDate||'')).slice(0,5).forEach(c=>{
        const li=document.createElement('li');
        li.innerHTML = `<strong>${escapeHTML(c.name)}</strong><br><small>Meeting: ${formatDateDisplay(c.meetingDate)}</small>`;
        ml.appendChild(li);
      });
      if (futureMeetings.length === 0) {
        ml.innerHTML = '<li>No upcoming meetings</li>';
      }
    }

    // Follow-up reminders detailed list with DD-MM-YYYY format
    const fl=$('#followup-reminders');
    if (fl) {
      fl.innerHTML='';
      futureFollowups.sort((a,b)=>(a.followUp||'').localeCompare(b.followUp||'')).slice(0,5).forEach(c=>{
        const li=document.createElement('li');
        li.innerHTML = `<strong>${escapeHTML(c.name)}</strong><br><small>Follow-up: ${formatDateDisplay(c.followUp)}</small>`;
        fl.appendChild(li);
      });
      if (futureFollowups.length === 0) {
        fl.innerHTML = '<li>No upcoming follow-ups</li>';
      }
    }
  }

  function renderTodaysTodo() {
    const todaysTodoEl = $('#todays-todo');
    if (!todaysTodoEl) return;

    todaysTodoEl.innerHTML = '';
    const today = getTodayDateString();
    
    let todoItems = [];

    // Get today's meetings
    const todaysMeetings = state.clients.filter(c => c.meetingDate === today);
    todaysMeetings.forEach(c => {
      todoItems.push({
        type: 'meeting',
        client: c,
        action: 'Meeting scheduled'
      });
    });

    // Get today's follow-ups
    const todaysFollowUps = state.clients.filter(c => c.followUp === today);
    todaysFollowUps.forEach(c => {
      todoItems.push({
        type: 'follow',
        client: c,
        action: 'Follow-up due'
      });
    });

    // Get today's events
    const todaysEvents = state.events.filter(e => e.date === today);
    todaysEvents.forEach(e => {
      todoItems.push({
        type: e.type || 'meeting',
        event: e,
        action: e.title
      });
    });

    if (todoItems.length === 0) {
      todaysTodoEl.innerHTML = '<div style="padding: 20px; text-align: center; color: #6b7280;">No tasks scheduled for today</div>';
      return;
    }

    todoItems.forEach(item => {
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';
      
      if (item.client) {
        todoItem.innerHTML = `
          <span class="type-badge ${item.type}">${item.type === 'meeting' ? 'Meeting' : 'Follow-up'}</span>
          <div style="flex: 1;">
            <div class="client-name">${escapeHTML(item.client.name)}</div>
            <div class="time-info">${item.action} • ${escapeHTML(item.client.phone || 'No phone')}</div>
          </div>
        `;
        todoItem.onclick = () => openClientModal(item.client);
      } else if (item.event) {
        todoItem.innerHTML = `
          <span class="type-badge ${item.type}">Event</span>
          <div style="flex: 1;">
            <div class="client-name">${escapeHTML(item.event.title)}</div>
            <div class="time-info">${escapeHTML(item.event.notes || 'No additional details')}</div>
          </div>
        `;
        todoItem.onclick = () => openEventModal(item.event);
      }
      
      todoItem.style.cursor = 'pointer';
      todaysTodoEl.appendChild(todoItem);
    });
  }

  function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Auto-update client status to "Confirmed" when advance is received
  function autoUpdateClientStatus(clientId, advanceAmount) {
    const client = state.clients.find(c => c.id === clientId);
    if (!client) return;

    const currentAdvance = Number(advanceAmount || 0);
    const wasConfirmed = client.status === 'Confirmed';

    // If advance > 0 and client is not already confirmed, auto-update to Confirmed
    if (currentAdvance > 0 && !wasConfirmed) {
      client.status = 'Confirmed';
      persistAll();
      toast(`${client.name}'s status automatically updated to Confirmed (advance received)`);
      renderAll(); // Re-render to show updated status
    }
  }

  // Modal functions
  function openClientModal(client){
    const dlg=$('#client-modal');
    const form=$('#client-form');
    form.reset();
    form.dataset.id=client?.id||'';
    if(client){
      form.name.value=client.name||'';
      form.phone.value=client.phone||'';
      form.email.value=client.email||'';
      form.weddingDate.value=client.weddingDate||'';
      form.venue.value=client.venue||'';
      form.status.value=client.status||'Enquiry';
      form.followUp.value=client.followUp||'';
      form.meetingDate.value=client.meetingDate||'';
      form.notes.value=client.notes||'';
    }
    try{ dlg.showModal(); }catch(e){ dlg.open=true; }
    form.onsubmit=(e)=>{
      e.preventDefault();
      const payload={
        id: form.dataset.id||uid(),
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        weddingDate: form.weddingDate.value,
        venue: form.venue.value,
        status: form.status.value,
        followUp: form.followUp.value,
        meetingDate: form.meetingDate.value,
        notes: form.notes.value
      };
      const idx=state.clients.findIndex(c=>c.id===payload.id);
      if(idx>-1) state.clients[idx]=payload;
      else state.clients.push(payload);
      persistAll();
      dlg.close();
      renderAll();
      // Re-populate filters when client data changes
      populateClientFilters();
      toast('Client saved');
    };
    $('#client-cancel').onclick=()=>{
      try{ dlg.close(); }catch(e){ dlg.open=false; }
    };
  }

  // ENHANCED: Project Modal with Real-time Payment Status Updates and Validation
  function openProjectModal(project){ 
    const dlg=$('#project-modal'); 
    const form=$('#project-form'); 
    form.reset(); 
    form.dataset.id=project?.id||''; 
    const sel=form.clientId; 
    sel.innerHTML=''; 

    // Get clients who already have projects
    const clientsWithProjects = new Set(state.projects.map(p => p.clientId));

    // If editing existing project, get all clients
    // If creating new project, only show clients without projects
    let availableClients;
    if (project?.id) {
      // Editing: show all clients, but indicate which ones have projects
      availableClients = state.clients;
    } else {
      // Creating new: only show clients without projects
      availableClients = state.clients.filter(c => !clientsWithProjects.has(c.id));
    }

    if (availableClients.length === 0) {
      const o = document.createElement('option');
      o.value = '';
      o.textContent = '— All clients already have projects —';
      sel.appendChild(o);
      toast('All clients already have projects. Edit existing projects or add new clients first.');
    } else {
      availableClients.forEach(c => {
        const o = document.createElement('option'); 
        o.value = c.id; 
        // For editing mode, indicate if client has project
        if (project?.id && clientsWithProjects.has(c.id) && c.id !== project.clientId) {
          o.textContent = `${c.name} (Already has project)`;
          o.disabled = true;
        } else {
          o.textContent = c.name;
        }
        sel.appendChild(o); 
      });
    }

    form.clientId.value = project?.clientId || sel.options[0]?.value || ''; 
    form.finalAmount.value = project?.finalAmount || ''; 
    form.advance.value = project?.advance || ''; 
    form.paymentStatus.value = project?.paymentStatus || 'Pending'; 

    // Clear any previous validation errors
    clearValidationErrors(form);

    // ENHANCED: Real-time payment status updates with validation
    function updatePaymentStatusLive() {
      const finalAmount = Number(form.finalAmount.value || 0);
      const advanceAmount = Number(form.advance.value || 0);

      // Clear previous validation errors
      clearValidationErrors(form);

      // VALIDATION: Check if advance exceeds final amount
      if (advanceAmount > finalAmount && finalAmount > 0) {
        showValidationError(form.advance, `Advance payment (₹${advanceAmount.toLocaleString('en-IN')}) cannot exceed final amount (₹${finalAmount.toLocaleString('en-IN')})`);
        return; // Don't update status if invalid
      }

      // AUTO-UPDATE PAYMENT STATUS based on amounts
      let newStatus = 'Pending';
      if (advanceAmount === 0) {
        newStatus = 'Pending';
      } else if (advanceAmount >= finalAmount && finalAmount > 0) {
        newStatus = 'Completed';
      } else if (advanceAmount > 0) {
        newStatus = 'Partial';
      }

      form.paymentStatus.value = newStatus;

      // Show enhanced status preview
      const statusContainer = form.querySelector('#status-preview') || createStatusPreview(form);
      if (statusContainer && finalAmount > 0) {
        statusContainer.style.display = 'block';
        const remaining = finalAmount - advanceAmount;
        
        if (newStatus === 'Completed') {
          statusContainer.innerHTML = '✅ <strong>Payment Status:</strong> Completed (Full payment received)';
          statusContainer.style.background = 'rgba(34, 197, 94, 0.1)';
          statusContainer.style.borderColor = 'rgba(34, 197, 94, 0.3)';
          statusContainer.style.color = '#15803d';
        } else if (newStatus === 'Partial') {
          statusContainer.innerHTML = `🟡 <strong>Payment Status:</strong> Partial (₹${remaining.toLocaleString('en-IN')} remaining)`;
          statusContainer.style.background = 'rgba(245, 158, 11, 0.1)';
          statusContainer.style.borderColor = 'rgba(245, 158, 11, 0.3)';
          statusContainer.style.color = '#b45309';
        } else {
          statusContainer.innerHTML = '💰 <strong>Payment Status:</strong> Pending (No advance received)';
          statusContainer.style.background = 'rgba(107, 114, 128, 0.1)';
          statusContainer.style.borderColor = 'rgba(107, 114, 128, 0.3)';
          statusContainer.style.color = '#6b7280';
        }
      } else if (statusContainer) {
        statusContainer.style.display = 'none';
      }
    }

    // Add event listeners for real-time updates
    form.finalAmount.addEventListener('input', updatePaymentStatusLive);
    form.advance.addEventListener('input', updatePaymentStatusLive);
    form.clientId.addEventListener('change', updatePaymentStatusLive);

    // Call once to set initial status when modal opens
    updatePaymentStatusLive();

    try{ dlg.showModal(); }catch(e){ dlg.open=true; } 
    form.onsubmit=(e)=>{
      e.preventDefault(); 

      // Clear any previous validation errors
      clearValidationErrors(form);

      const finalAmount = Number(form.finalAmount.value || 0);
      const advanceAmount = Number(form.advance.value || 0);

      // ENHANCED VALIDATION: Check if advance exceeds final amount
      if (advanceAmount > finalAmount && finalAmount > 0) {
        showValidationError(form.advance, `Advance payment (₹${advanceAmount.toLocaleString('en-IN')}) cannot exceed final amount (₹${finalAmount.toLocaleString('en-IN')})`);
        toast('❌ Advance payment cannot exceed final amount');
        return;
      }

      // DUPLICATE PREVENTION: Check if client already has a project (for new projects)
      if (!project?.id) {
        const selectedClientId = form.clientId.value;
        const existingProject = state.projects.find(p => p.clientId === selectedClientId);
        if (existingProject) {
          toast('This client already has a project. Each client can have only one project.');
          return;
        }
      }

      // AUTO-CALCULATE PAYMENT STATUS
      let paymentStatus = 'Pending';
      if (advanceAmount === 0) {
        paymentStatus = 'Pending';
      } else if (advanceAmount >= finalAmount && finalAmount > 0) {
        paymentStatus = 'Completed';
      } else if (advanceAmount > 0) {
        paymentStatus = 'Partial';
      }

      const payload={ 
        id: form.dataset.id||uid(), 
        clientId: form.clientId.value, 
        finalAmount: finalAmount, 
        advance: advanceAmount, 
        paymentStatus: paymentStatus, // Use auto-calculated status
        costSheet: project?.costSheet || [],
        elementSheetText: project?.elementSheetText || '',
        elementFiles: project?.elementFiles || [], // NEW: Preserve element files
        overviewMedia: project?.overviewMedia || []
      }; 
      const idx=state.projects.findIndex(p=>p.id===payload.id); 
      if(idx>-1) state.projects[idx]=payload; 
      else state.projects.push(payload); 

      // Auto-update client status to "Confirmed" if advance received
      if (advanceAmount > 0) {
        autoUpdateClientStatus(payload.clientId, advanceAmount);
      }

      persistAll(); 
      dlg.close(); 
      renderAll(); 
      
      // Enhanced success message based on payment status
      const statusMsg = paymentStatus === 'Completed' ? '✅ Project saved - Payment completed!' : 
                        paymentStatus === 'Partial' ? `🟡 Project saved - Partial payment (₹${(finalAmount - advanceAmount).toLocaleString('en-IN')} remaining)` : 
                        '💰 Project saved - Payment pending';
      toast(statusMsg);
    }; 
    $('#project-cancel').onclick=()=>{
      try{ dlg.close(); }catch(e){ dlg.open=false; } 
    }; 
  }

  function openDesignModal(design){
    const dlg=$('#design-modal');
    const form=$('#design-form');
    form.reset();
    form.dataset.id=design?.id||'';
    if(design){
      form.name.value=design.name||'';
      form.category.value=design.category||'Wedding Decor';
      form.description.value=design.description||'';
    }
    try{ dlg.showModal(); }catch(e){ dlg.open=true; }
    form.onsubmit=async (e)=>{
      e.preventDefault();
      const files=form.images.files;
      const images=[];
      for(let i=0;i<files.length;i++){
        const dataURL=await fileToDataURL(files[i]);
        images.push(dataURL);
      }
      const payload={
        id: form.dataset.id||uid(),
        name: form.name.value,
        category: form.category.value,
        description: form.description.value,
        images: design?.images ? [...design.images, ...images] : images
      };
      const idx=state.designs.findIndex(d=>d.id===payload.id);
      if(idx>-1) state.designs[idx]=payload;
      else state.designs.push(payload);
      persistAll();
      dlg.close();
      renderAll();
      toast('Design saved');
    };
    $('#design-cancel').onclick=()=>{
      try{ dlg.close(); }catch(e){ dlg.open=false; }
    };
  }

  function openEventModal(event){
    const dlg=$('#event-modal');
    const form=$('#event-form');
    form.reset();
    form.dataset.id=event?.id||'';
    if(event){
      form.title.value=event.title||'';
      form.date.value=event.date||'';
      form.type.value=event.type||'wedding';
      form.notes.value=event.notes||'';
    }
    try{ dlg.showModal(); }catch(e){ dlg.open=true; }
    form.onsubmit=(e)=>{
      e.preventDefault();
      const payload={
        id: form.dataset.id||uid(),
        title: form.title.value,
        date: form.date.value,
        type: form.type.value,
        notes: form.notes.value
      };
      const idx=state.events.findIndex(ev=>ev.id===payload.id);
      if(idx>-1) state.events[idx]=payload;
      else state.events.push(payload);
      persistAll();
      dlg.close();
      renderAll();
      toast('Event saved');
    };
    $('#event-cancel').onclick=()=>{
      try{ dlg.close(); }catch(e){ dlg.open=false; }
    };
  }

  // Project detail functionality
  function openProjectDetail(projectId){
    state.activeProjectId = projectId;
    const dlg = $('#project-detail-modal');
    const project = state.projects.find(p => p.id === projectId);
    const client = state.clients.find(c => c.id === project?.clientId) || {};
    
    if (!project) {
      toast('Project not found');
      return;
    }

    // Update project detail info
    $('#project-detail-client').textContent = client.name || 'Unknown Client';
    $('#project-detail-final').textContent = '₹' + (project.finalAmount || 0).toLocaleString('en-IN');
    $('#project-detail-advance').textContent = '₹' + (project.advance || 0).toLocaleString('en-IN');
    $('#project-detail-payment-status').textContent = project.paymentStatus || 'Pending';

    try{ dlg.showModal(); }catch(e){ dlg.open=true; }
    showDetailTab('overview');
  }

  function showDetailTab(tabName){
    $$('[data-detail-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.detailTab === tabName));
    $$('.detail-tab').forEach(tab => tab.classList.toggle('active', tab.id === `detail-${tabName}`));

    // Alternative tab switching for project detail modal
    $$("#project-detail-modal .tab-btn").forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
    $$("#project-detail-modal .tab-content").forEach(content => {
      if (content.id === tabName + '-content') {
        content.style.display = 'block';
        content.classList.add('active');
      } else {
        content.style.display = 'none';
        content.classList.remove('active');
      }
    });

    if(tabName === 'overview') renderDetailOverview();
    else if(tabName === 'cost-sheet') renderCostSheet();
    else if(tabName === 'element-sheet') {
      renderElementsSheet();
      renderElementFiles(); // NEW: Render uploaded files
    }
  }

  function renderDetailOverview(){
    const proj=state.projects.find(p=>p.id===state.activeProjectId);
    if (!proj) return;
    
    if (!proj.overviewMedia) proj.overviewMedia = [];
    
    const container = $('#overview-media-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (proj.overviewMedia.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 20px; grid-column: 1/-1;">No media files uploaded yet</p>';
      return;
    }
    
    proj.overviewMedia.forEach((media, index) => {
      const mediaEl = document.createElement('div');
      mediaEl.className = 'project-design-item';
      
      const isVideo = media.type?.startsWith('video/');
      const mediaContent = isVideo ?
        `<video controls style="width: 100%; max-height: 200px; display: block;">
            <source src="${media.src}" type="${media.type}">
            Your browser does not support video.
        </video>` :
        `<img src="${media.src}" alt="${media.name}" style="width: 100%; max-height: 200px; object-fit: cover; display: block;">`;
      
      mediaEl.innerHTML = `
        ${mediaContent}
        <div style="padding: 12px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px;">${escapeHTML(media.name)}</h4>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${escapeHTML(media.type)} • ${formatFileSize(media.size)}</p>
          <button class="action warn" onclick="removeOverviewMedia(${index})" style="font-size: 12px; padding: 4px 8px;">Remove</button>
        </div>
      `;
      
      container.appendChild(mediaEl);
    });
  }

  // Cost sheet
  function renderCostSheet(){
    const proj=state.projects.find(p=>p.id===state.activeProjectId);
    if(!proj.costSheet) proj.costSheet = [];
    const tbody=$('#cost-table tbody');
    tbody.innerHTML='';
    let totalEst=0, totalAct=0;
    proj.costSheet.forEach((r, i)=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${escapeHTML(r.item)}</td><td>${escapeHTML(r.vendor)}</td><td>₹${Number(r.estimated||0).toLocaleString('en-IN')}</td><td>₹${Number(r.actual||0).toLocaleString('en-IN')}</td><td>${escapeHTML(r.notes||'')}</td><td><button class="action warn" data-act="del-cost" data-id="${i}">Delete</button></td>`;
      tbody.appendChild(tr);
      totalEst += Number(r.estimated||0);
      totalAct += Number(r.actual||0);
    });
    $('#cost-total-estimated').textContent = '₹' + totalEst.toLocaleString('en-IN');
    $('#cost-total-actual').textContent = '₹' + totalAct.toLocaleString('en-IN');
  }

  // ENHANCED: Element Sheet rendering with auto-save and file support
  function renderElementsSheet(){
    console.log('🎯 Rendering Enhanced Element Sheet...');
    
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) {
      console.error('❌ Project not found for Element Sheet');
      return;
    }
    
    const textarea = $('#element-sheet-text');
    if (textarea) {
      textarea.value = project.elementSheetText || '';
      console.log('✅ Element Sheet textarea populated with:', project.elementSheetText?.length || 0, 'characters');
    } else {
      console.error('❌ Element Sheet textarea not found!');
    }
  }

  // Action handler
  function handleAction(action, id){
    if(action==='edit-client'){
      const client=state.clients.find(c=>c.id===id);
      openClientModal(client);
    }
    else if(action==='del-client'){
      if(confirm('Delete this client?')){
        state.clients=state.clients.filter(c=>c.id!==id);
        persistAll();
        renderAll();
        // Re-populate filters when client data changes
        populateClientFilters();
        toast('Client deleted');
      }
    }
    else if(action==='edit-project'){
      const project=state.projects.find(p=>p.id===id);
      openProjectModal(project);
    }
    else if(action==='del-project'){
      if(confirm('Delete this project?')){
        state.projects=state.projects.filter(p=>p.id!==id);
        persistAll();
        renderAll();
        toast('Project deleted');
      }
    }
    else if(action==='open-project'){
      openProjectDetail(id);
    }
    else if(action==='edit-design'){
      const design=state.designs.find(d=>d.id===id);
      openDesignModal(design);
    }
    else if(action==='del-design'){
      if(confirm('Delete this design?')){
        state.designs=state.designs.filter(d=>d.id!==d);
        persistAll();
        renderAll();
        toast('Design deleted');
      }
    }
    else if(action==='download-design'){
      downloadDesignDoc(id);
    }
  }

  // Add cost row
  $('#add-cost-item')?.addEventListener('click', ()=>{
    const proj=state.projects.find(p=>p.id===state.activeProjectId);
    const item=$('#cost-item').value;
    const vendor=$('#cost-vendor').value;
    const estimated=Number($('#cost-estimated').value||0);
    const actual=Number($('#cost-actual').value||0);
    const notes=$('#cost-notes').value;

    if(!item.trim()) return toast('Item name required');

    proj.costSheet.push({item,vendor,estimated,actual,notes});
    persistAll();
    renderCostSheet();

    $('#cost-item').value='';
    $('#cost-vendor').value='';
    $('#cost-estimated').value='';
    $('#cost-actual').value='';
    $('#cost-notes').value='';
    toast('Cost item added');
  });

  // Detail tab switching
  document.body.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-detail-tab]');
    if(btn){
      showDetailTab(btn.dataset.detailTab);
    }
    
    // Handle project detail modal tabs
    if (e.target.onclick && e.target.onclick.toString().includes('setProjectDetailTab')) {
      // This will be handled by the onclick attribute
      return;
    }
  });

  function downloadDesignDoc(id){
    const design=state.designs.find(d=>d.id===id);
    const html=`<html><body><h1>${escapeHTML(design.name)}</h1><p><strong>Category:</strong> ${escapeHTML(design.category)}</p><p><strong>Description:</strong> ${escapeHTML(design.description||'')}</p>${(design.images||[]).map(src=>`<img src="${src}" style="max-width:400px;margin:10px;">`).join('')}</body></html>`;
    const blob=new Blob([html],{type:'application/msword'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=(design.name||'design')+'.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('Design doc downloaded');
  }

  // ENHANCED: Export Element Sheet with Files
  function exportElementSheetAsWord() {
    console.log('📄 Exporting Enhanced Element Sheet as Word...');
    
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) {
      toast('Project not found');
      return;
    }
    
    const client = state.clients.find(c => c.id === project.clientId) || {};
    const elementText = project.elementSheetText || 'No elements listed yet.';
    
    const html = `<!DOCTYPE html>
    <html><head>
      <title>Element Sheet - ${escapeHTML(client.name || 'Project')}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
        h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .project-info { background: #f8f9ff; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .elements { white-space: pre-wrap; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .files { background: #f0f9ff; padding: 15px; margin: 20px 0; border-radius: 5px; }
      </style>
    </head><body>
      <h1>📝 Project Element Sheet</h1>
      <div class="project-info">
        <p><strong>Client:</strong> ${escapeHTML(client.name || 'Unknown Client')}</p>
        <p><strong>Wedding Date:</strong> ${formatDateDisplay(client.weddingDate) || 'Not specified'}</p>
        <p><strong>Venue:</strong> ${escapeHTML(client.venue || 'Not specified')}</p>
        <p><strong>Project Amount:</strong> ₹${(project.finalAmount || 0).toLocaleString('en-IN')}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
      </div>
      <h2>🎯 Required Elements:</h2>
      <div class="elements">${escapeHTML(elementText)}</div>
      ${project.elementFiles && project.elementFiles.length > 0 ? `
        <div class="files">
          <h3>📎 Uploaded Files:</h3>
          <ul>
            ${project.elementFiles.map(f => `<li>${escapeHTML(f.name)} (${formatFileSize(f.size)})</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </body></html>`;
    
    const blob = new Blob([html], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Element_Sheet_${client.name || 'Project'}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    console.log('✅ Enhanced Element Sheet exported successfully');
    toast('📄 Element sheet with files exported as Word document!');
  }

  function clearElementSheet() {
    if (confirm('Are you sure you want to clear all element text and files? This cannot be undone.')) {
      const textarea = $('#element-sheet-text');
      if (textarea) {
        textarea.value = '';
      }
      
      // Also clear uploaded files
      const project = state.projects.find(p => p.id === state.activeProjectId);
      if (project) {
        project.elementSheetText = '';
        project.elementFiles = [];
        persistAll();
        renderElementFiles();
      }
      
      console.log('🗑️ Element Sheet and files cleared');
      toast('🗑️ Element sheet and files cleared');
    }
  }

  // Export receivables (CSV)
  function exportReceivables(){
    const rows=[['Client','Final','Advance','Due']];
    state.projects.forEach(p=>{
      const client=state.clients.find(c=>c.id===p.clientId)||{};
      const due=Math.max(0,(p.finalAmount||0)-(p.advance||0));
      rows.push([client.name||'—',p.finalAmount||0,p.advance||0,due]);
    });
    const csv=rows.map(r=>r.map(c=>`"${String(c||'').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob=new Blob([csv],{type:'text/csv'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='receivables.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('Receivables exported');
  }

  // Export client data (CSV)
  function exportClientData(){
    const rows=[
      ['Name', 'Phone', 'Email', 'Wedding Date', 'Venue', 'Status', 'Follow-up Date', 'Meeting Date', 'Notes']
    ];
    
    state.clients.forEach(c => {
      rows.push([
        c.name || '',
        c.phone || '',
        c.email || '',
        formatDateDisplay(c.weddingDate) || '',
        c.venue || '',
        c.status || '',
        formatDateDisplay(c.followUp) || '',
        formatDateDisplay(c.meetingDate) || '',
        c.notes || ''
      ]);
    });
    
    const csv = rows.map(r => r.map(c => `"${String(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'client-data.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('Client data exported to Excel format');
  }

  // Design file reader helper
  function fileToDataURL(file){
    return new Promise(res=>{
      const r=new FileReader();
      r.onload=()=>res(r.result);
      r.readAsDataURL(file);
    });
  }

  // Delete handlers for cost and element rows
  document.addEventListener('click',(e)=>{
    const delCost = e.target.closest('[data-act="del-cost"]');
    if(delCost){
      const idx=Number(delCost.dataset.id);
      const proj=state.projects.find(p=>p.id===state.activeProjectId);
      proj.costSheet.splice(idx,1);
      persistAll();
      renderCostSheet();
      toast('Cost item deleted');
    }
  });

  // Overview media functions
  function addOverviewMediaFiles() {
    const fileInput = $('#overview-media-file');
    if (!fileInput || fileInput.files.length === 0) {
      toast('Please select files to upload');
      return;
    }
    
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) {
      toast('Project not found');
      return;
    }
    
    if (!project.overviewMedia) project.overviewMedia = [];
    
    const files = Array.from(fileInput.files);
    let processedCount = 0;
    
    files.forEach(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast(`File "${file.name}" is not a valid image or video file`);
        return;
      }
      
      if (file.size > 50 * 1024 * 1024) {
        toast(`File "${file.name}" is too large (max 50MB)`);
        return;
      }
      
      fileToDataURL(file)
        .then(dataUrl => {
          project.overviewMedia.push({
            id: uid(),
            name: file.name,
            type: file.type,
            size: file.size,
            src: dataUrl,
            uploadDate: new Date().toISOString()
          });
          
          processedCount++;
          if (processedCount === files.length) {
            persistAll();
            renderDetailOverview();
            toast(`${processedCount} file(s) uploaded successfully`);
            fileInput.value = '';
          }
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          toast(`Error uploading "${file.name}"`);
        });
    });
  }

  function removeOverviewMedia(index) {
    if (!confirm('Remove this media file? This cannot be undone.')) return;
    
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project || !project.overviewMedia) return;
    
    project.overviewMedia.splice(index, 1);
    persistAll();
    renderDetailOverview();
    toast('Media file removed');
  }

  // Utilities
  function escapeHTML(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // init and render all with filter initialization
  function renderAll(){
    renderClients();
    renderProjects();
    renderDesigns();
    renderPendingPayments();
    renderCalendar();
    renderDashboard();
    populateClientFilters(); // Re-populate filters when data changes
  }

  initNavigation();
  initClientFilters(); // Initialize filter event listeners
  renderAll();

  // Expose for debugging and global access
  window._wcrm={
    state,
    save: persistAll,
    exportReceivables,
    exportClientData,
    setActiveTab,
    formatDateDisplay,
    populateClientFilters,
    uploadElementFiles,
    removeElementFile,
    exportElementSheetAsWord,
    clearElementSheet,
    addOverviewMediaFiles,
    removeOverviewMedia
  };

  // Make functions globally accessible for HTML onclick handlers
  window.setActiveTab = setActiveTab;
  window.setProjectDetailTab = (tabName) => showDetailTab(tabName);
  window.uploadElementFiles = uploadElementFiles;
  window.removeElementFile = removeElementFile;
  window.exportElementSheetAsWord = exportElementSheetAsWord;
  window.clearElementSheet = clearElementSheet;
  window.addOverviewMediaFiles = addOverviewMediaFiles;
  window.removeOverviewMedia = removeOverviewMedia;

  console.log('✅ WeddingCraft CRM v6 initialized with Enhanced Element Sheet Management!');
  toast('🎉 Enhanced Element Sheet with auto-save and file upload ready!');
})();
