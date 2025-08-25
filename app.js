// COMPLETE FUNCTIONAL Wedding CRM Application JavaScript - ALL CRITICAL ISSUES FIXED

class WeddingCRM {
    constructor() {
        // Initialize data with provided JSON structure
        this.clients = [
            {
                id: 1,
                name: "Priya & Arjun Sharma",
                phone: "+91 98765-43210",
                weddingDate: "2025-12-15",
                status: "partial",
                venue: "Grand Palace Hotel, Mumbai",
                budget: 450000,
                advancePaid: 150000,
                notes: "Prefer traditional gold and red theme. Need floral mandap design.",
                createdDate: "2025-08-01",
                followUpDate: "2025-09-01",
                meetingDate: "2025-09-05",
                elementSheet: {
                    textContent: "Wedding Elements Required:\n\n1. Main Mandap - Traditional design with marigold garlands\n2. Entrance Decoration - Grand archway with roses\n3. Stage Backdrop - Golden fabric with fairy lights\n4. Table Centerpieces - 50 units with red roses\n5. Flower Petals - For walkway decoration\n6. Lighting - Warm yellow LED strings\n7. Seating Arrangement - 200 chairs with covers",
                    uploadedFiles: ["element_sheet_sharma.docx"],
                    lastUpdated: "2025-08-15"
                },
                costSheet: {
                    royalty: 22500,
                    labour: 80000,
                    transport: 15000,
                    newPurchase: 120000,
                    lights: 45000,
                    floral: 85000,
                    generators: 25000,
                    linens: 35000,
                    misc: 15000,
                    otherExpenses: 7500,
                    lastUpdated: "2025-08-20"
                }
            },
            {
                id: 2,
                name: "Sneha & Raj Patel",
                phone: "+91 87654-32109",
                weddingDate: "2025-10-28",
                status: "inquiry",
                venue: "Lakeside Resort, Pune",
                budget: 325000,
                advancePaid: 0,
                notes: "Looking for modern pastel theme. Beach wedding setup required.",
                createdDate: "2025-08-15",
                followUpDate: "2025-08-30",
                meetingDate: "2025-09-02",
                elementSheet: {
                    textContent: "Beach Wedding Elements:\n\n1. Beach Arch - White fabric with seashells\n2. Aisle Runner - Sand-colored carpet\n3. Seating - Wooden chairs with white cushions\n4. Centerpieces - Coral and white flowers\n5. Lighting - Lanterns and fairy lights\n6. Backdrop - Ocean view enhancement",
                    uploadedFiles: [],
                    lastUpdated: "2025-08-20"
                },
                costSheet: {
                    royalty: 16250,
                    labour: 55000,
                    transport: 12000,
                    newPurchase: 85000,
                    lights: 35000,
                    floral: 60000,
                    generators: 18000,
                    linens: 28000,
                    misc: 12000,
                    otherExpenses: 3750,
                    lastUpdated: "2025-08-22"
                }
            },
            {
                id: 3,
                name: "Anita & Vikram Singh",
                phone: "+91 76543-21098",
                weddingDate: "2025-11-22",
                status: "confirmed",
                venue: "Heritage Haveli, Jaipur",
                budget: 675000,
                advancePaid: 675000,
                notes: "Royal Rajasthani theme. Multiple function decorations needed.",
                createdDate: "2025-07-20",
                followUpDate: "2025-09-15",
                meetingDate: "2025-10-01",
                elementSheet: {
                    textContent: "Royal Rajasthani Wedding Elements:\n\n1. Mehendi Decoration - Rajasthani umbrellas and marigolds\n2. Sangam Ceremony - Traditional torans and diyas\n3. Wedding Mandap - Royal palace style with golden pillars\n4. Reception Backdrop - Heritage Haveli theme\n5. Table Settings - Brass utensils and traditional placemats\n6. Lighting - Traditional chandeliers and oil lamps",
                    uploadedFiles: ["rajasthani_elements.docx", "venue_layout.xlsx"],
                    lastUpdated: "2025-08-10"
                },
                costSheet: {
                    royalty: 33750,
                    labour: 125000,
                    transport: 22000,
                    newPurchase: 185000,
                    lights: 68000,
                    floral: 95000,
                    generators: 38000,
                    linens: 55000,
                    misc: 25000,
                    otherExpenses: 8250,
                    lastUpdated: "2025-08-18"
                }
            }
        ];

        this.designs = [
            {
                id: 1,
                name: "Traditional Mandap Design",
                category: "Traditional",
                description: "Elegant traditional mandap with marigold and rose decorations",
                images: [
                    {
                        id: 1,
                        name: "mandap_main.jpg",
                        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='300' height='200' fill='%23FFF8DC'/><circle cx='150' cy='100' r='50' fill='%23D4AF37'/><text x='150' y='105' text-anchor='middle' fill='%23B8860B' font-size='12'>Traditional Mandap</text></svg>",
                        uploadDate: "2025-07-15"
                    }
                ],
                customizable: true,
                customizationNotes: "Can be adapted for different venue sizes. Flower colors customizable.",
                createdDate: "2025-07-15",
                createdBy: "Design Team"
            },
            {
                id: 2,
                name: "Modern Floral Arch",
                category: "Modern",
                description: "Contemporary floral arch with white and pink roses",
                images: [
                    {
                        id: 1,
                        name: "floral_arch.jpg",
                        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='300' height='200' fill='%23FFE4E6'/><path d='M50 150 Q150 50 250 150' stroke='%23E91E63' stroke-width='8' fill='none'/><text x='150' y='180' text-anchor='middle' fill='%23E91E63' font-size='12'>Modern Floral</text></svg>",
                        uploadDate: "2025-07-20"
                    }
                ],
                customizable: true,
                customizationNotes: "Flower types and colors fully customizable.",
                createdDate: "2025-07-20",
                createdBy: "Design Team"
            }
        ];

        this.projects = [
            {
                id: 1,
                clientId: 1,
                clientName: "Priya & Arjun Sharma",
                venue: "Grand Palace Hotel, Mumbai",
                weddingDate: "2025-12-15",
                images: [
                    {
                        id: 1,
                        name: "mandap_final.jpg",
                        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='300' height='200' fill='%23FFF8DC'/><circle cx='150' cy='100' r='50' fill='%23D4AF37'/><text x='150' y='105' text-anchor='middle' fill='%23B8860B' font-size='10'>Final Design</text></svg>",
                        uploadDate: "2025-08-15"
                    }
                ],
                finalizedAmount: 450000,
                paymentStatus: "partial",
                amountPaid: 150000,
                projectStatus: "in-progress"
            },
            {
                id: 2,
                clientId: 3,
                clientName: "Anita & Vikram Singh",
                venue: "Heritage Haveli, Jaipur",
                weddingDate: "2025-11-22",
                images: [],
                finalizedAmount: 675000,
                paymentStatus: "completed",
                amountPaid: 675000,
                projectStatus: "confirmed"
            }
        ];

        this.calendarEvents = [];
        this.currentSection = 'dashboard';
        this.currentDate = new Date(2025, 7, 25); // August 25, 2025
        this.editingClient = null;
        this.editingProject = null;
        this.editingDesign = null;
        this.editingEvent = null;
        this.currentClientDetails = null;
        this.nextId = {
            client: Math.max(...this.clients.map(c => c.id), 0) + 1,
            design: Math.max(...this.designs.map(d => d.id), 0) + 1,
            project: Math.max(...this.projects.map(p => p.id), 0) + 1,
            event: 1
        };
        
        this.updateCalendarFromClients();
        this.init();
    }

    init() {
        console.log('Initializing Wedding CRM...');
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }

    setupApplication() {
        console.log('Setting up application...');
        
        this.setupEventListeners();
        this.renderDashboard();
        this.renderClients();
        this.renderProjects();
        this.renderDesigns();
        this.renderCalendar();
        this.populateDropdowns();
        
        console.log('Application setup complete');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation - FIXED: Direct click handlers
        this.setupNavigation();
        
        // Dashboard widgets - FIXED
        this.setupDashboardWidgets();
        
        // Search functionality
        this.setupSearchFunctionality();
        
        // ESC key closes all popups
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const visibleModals = document.querySelectorAll('.modal:not(.hidden)');
                visibleModals.forEach(modal => this.closeModal(modal));
            }
        });

        this.setupButtonListeners();
        this.setupModalListeners();
        this.setupFormListeners();
        this.setupCalendarControls();
        this.setupFilterTabs();
    }

    setupNavigation() {
        // FIXED: Direct event listeners for navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        console.log('Found nav buttons:', navButtons.length);
        
        navButtons.forEach((btn, index) => {
            const section = btn.getAttribute('data-section');
            console.log(`Setting up nav button ${index + 1}: ${section}`);
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Navigation clicked: ${section}`);
                this.switchSection(section);
            });
            
            // Also handle Enter key for accessibility
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log(`Navigation key pressed: ${section}`);
                    this.switchSection(section);
                }
            });
        });
    }

    setupDashboardWidgets() {
        // FIXED: Dashboard widgets clickable navigation
        const widgets = document.querySelectorAll('.clickable-widget');
        console.log('Found dashboard widgets:', widgets.length);
        
        widgets.forEach((widget, index) => {
            const navigate = widget.getAttribute('data-navigate');
            console.log(`Setting up widget ${index + 1}: ${navigate}`);
            
            widget.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Widget clicked: ${navigate}`);
                if (navigate) {
                    this.switchSection(navigate);
                }
            });
            
            // Make widgets focusable and keyboard accessible
            widget.setAttribute('tabindex', '0');
            widget.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (navigate) {
                        this.switchSection(navigate);
                    }
                }
            });
        });
    }

    setupSearchFunctionality() {
        const clientSearch = document.getElementById('client-search');
        if (clientSearch) {
            clientSearch.addEventListener('input', (e) => {
                this.searchClients(e.target.value);
            });
        }

        const projectSearch = document.getElementById('project-search');
        if (projectSearch) {
            projectSearch.addEventListener('input', (e) => {
                this.searchProjects(e.target.value);
            });
        }
    }

    setupButtonListeners() {
        // FIXED: Direct button event listeners
        console.log('Setting up button listeners...');
        
        const buttonHandlers = [
            { id: 'add-client-btn', handler: () => this.openClientModal() },
            { id: 'add-project-btn', handler: () => this.openProjectModal() },
            { id: 'add-design-btn', handler: () => this.openDesignModal() },
            { id: 'add-event-btn', handler: () => this.openEventModal() },
            { id: 'save-element-sheet', handler: () => this.saveElementSheet() },
            { id: 'download-element-sheet', handler: () => this.downloadElementSheet() },
            { id: 'save-cost-sheet', handler: () => this.saveCostSheet() }
        ];

        buttonHandlers.forEach(({ id, handler }) => {
            const btn = document.getElementById(id);
            if (btn) {
                console.log(`Setting up button: ${id}`);
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`Button clicked: ${id}`);
                    handler();
                });
            } else {
                console.log(`Button not found: ${id}`);
            }
        });
    }

    setupModalListeners() {
        // Close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Cancel buttons
        const cancelButtons = {
            'cancel-client': 'client-modal',
            'cancel-project': 'project-modal',
            'cancel-design': 'design-modal',
            'cancel-event': 'event-modal'
        };

        Object.keys(cancelButtons).forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.closeModal(document.getElementById(cancelButtons[id]));
                });
            }
        });

        // Close on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    setupFormListeners() {
        // Form submissions
        const forms = [
            { id: 'client-form', handler: (e) => { e.preventDefault(); this.saveClient(); }},
            { id: 'project-form', handler: (e) => { e.preventDefault(); this.saveProject(); }},
            { id: 'design-form', handler: (e) => { e.preventDefault(); this.saveDesign(); }},
            { id: 'event-form', handler: (e) => { e.preventDefault(); this.saveEvent(); }}
        ];

        forms.forEach(({ id, handler }) => {
            const form = document.getElementById(id);
            if (form) {
                form.addEventListener('submit', handler);
            }
        });

        // Image preview handlers
        const designImagesInput = document.getElementById('design-images');
        if (designImagesInput) {
            designImagesInput.addEventListener('change', (e) => {
                this.previewMultipleImages(e.target, 'design-image-preview');
            });
        }

        const projectImagesInput = document.getElementById('project-images');
        if (projectImagesInput) {
            projectImagesInput.addEventListener('change', (e) => {
                this.previewMultipleImages(e.target, 'project-image-preview');
            });
        }

        // Auto-update payment status
        const projectAdvanceInput = document.getElementById('project-advance');
        const projectAmountInput = document.getElementById('project-amount');
        if (projectAdvanceInput && projectAmountInput) {
            [projectAdvanceInput, projectAmountInput].forEach(input => {
                input.addEventListener('input', () => {
                    this.updatePaymentStatusInForm();
                });
                input.addEventListener('change', () => {
                    this.updatePaymentStatusInForm();
                });
            });
        }

        // Cost sheet auto-calculation
        const costInputs = [
            'cost-royalty', 'cost-labour', 'cost-transport', 'cost-new-purchase',
            'cost-lights', 'cost-floral', 'cost-generators', 'cost-linens',
            'cost-misc', 'cost-other-expenses'
        ];

        costInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    this.updateTotalCost();
                });
            }
        });
    }

    setupCalendarControls() {
        const prevBtn = document.getElementById('calendar-prev');
        const nextBtn = document.getElementById('calendar-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
            });
        }
    }

    setupFilterTabs() {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilterTab(e.target);
            });
        });
    }

    switchSection(sectionName) {
        console.log(`Switching to section: ${sectionName}`);
        
        // Update navigation active state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            console.log(`Set active nav button for: ${sectionName}`);
        }

        // Update sections visibility
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(sectionName);
        if (activeSection) {
            activeSection.classList.add('active');
            console.log(`Activated section: ${sectionName}`);
        } else {
            console.error(`Section not found: ${sectionName}`);
        }

        this.currentSection = sectionName;
        
        // Re-render current section content and setup action listeners
        switch(sectionName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'clients':
                this.renderClients();
                break;
            case 'projects':
                this.renderProjects();
                break;
            case 'designs':
                this.renderDesigns();
                break;
            case 'calendar':
                this.renderCalendar();
                break;
            case 'pending-payments':
                this.renderPendingPayments();
                break;
        }
    }

    // Calendar sync with client dates
    updateCalendarFromClients() {
        this.calendarEvents = [];
        let eventId = 1;

        this.clients.forEach(client => {
            // Add wedding event ONLY if confirmed
            if (client.weddingDate && client.status === 'confirmed') {
                this.calendarEvents.push({
                    id: eventId++,
                    title: `${client.name} Wedding`,
                    type: "wedding",
                    date: client.weddingDate,
                    clientId: client.id,
                    venue: client.venue,
                    notes: "Wedding ceremony"
                });
            }

            // Add follow-up event
            if (client.followUpDate) {
                this.calendarEvents.push({
                    id: eventId++,
                    title: `Follow-up: ${client.name}`,
                    type: "followup",
                    date: client.followUpDate,
                    clientId: client.id,
                    notes: "Client follow-up appointment"
                });
            }

            // Add meeting event
            if (client.meetingDate) {
                this.calendarEvents.push({
                    id: eventId++,
                    title: `Meeting: ${client.name}`,
                    type: "meeting",
                    date: client.meetingDate,
                    clientId: client.id,
                    venue: client.venue,
                    notes: "Client meeting"
                });
            }
        });

        this.nextId.event = eventId;
    }

    renderDashboard() {
        // Calculate stats
        const totalClients = this.clients.length;
        const activeProjects = this.projects.filter(p => p.projectStatus !== 'completed').length;
        const pendingAmount = this.projects.reduce((sum, p) => sum + (p.finalizedAmount - p.amountPaid), 0);
        
        // Meeting reminders (upcoming meetings within 7 days)
        const today = new Date(2025, 7, 25);
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const meetingReminders = this.clients.filter(c => {
            if (!c.meetingDate) return false;
            const meetingDate = new Date(c.meetingDate);
            return meetingDate >= today && meetingDate <= nextWeek;
        }).length;

        // Update stats
        this.updateElement('total-clients', totalClients);
        this.updateElement('active-projects', activeProjects);
        this.updateElement('pending-amount', `₹${pendingAmount.toLocaleString()}`);
        this.updateElement('meeting-reminders', meetingReminders);

        // Render dashboard widgets
        this.renderUpcomingEvents();
        this.renderMeetingReminders();
        this.renderDashboardCalendar();
    }

    renderUpcomingEvents() {
        const eventsEl = document.getElementById('upcoming-events-list');
        if (!eventsEl) return;

        // Only show confirmed weddings
        const confirmedWeddings = this.calendarEvents
            .filter(event => event.type === 'wedding')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);

        eventsEl.innerHTML = confirmedWeddings.map(event => `
            <div class="recent-item">
                <h4>${event.title}</h4>
                <p>Date: ${this.formatDate(event.date)} • ${event.venue || 'TBD'}</p>
            </div>
        `).join('') || '<p>No confirmed weddings scheduled</p>';
    }

    renderMeetingReminders() {
        const remindersEl = document.getElementById('meeting-reminders-list');
        if (!remindersEl) return;

        const today = new Date(2025, 7, 25);
        const upcomingMeetings = this.clients
            .filter(client => {
                if (!client.meetingDate) return false;
                const meetingDate = new Date(client.meetingDate);
                return meetingDate >= today;
            })
            .sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate))
            .slice(0, 3);

        remindersEl.innerHTML = upcomingMeetings.map(client => `
            <div class="recent-item">
                <h4>Meeting: ${client.name}</h4>
                <p>Date: ${this.formatDate(client.meetingDate)} • ${client.venue || 'TBD'}</p>
            </div>
        `).join('') || '<p>No upcoming meetings</p>';
    }

    renderDashboardCalendar() {
        const calendarEl = document.getElementById('dashboard-calendar');
        if (!calendarEl) return;

        const today = new Date(2025, 7, 25);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const eventsInMonth = this.calendarEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
        });

        let calendarHtml = '';
        
        // Add day headers
        const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        dayHeaders.forEach(day => {
            calendarHtml += `<div class="calendar-header">${day}</div>`;
        });

        // Add days
        for (let day = 1; day <= endOfMonth.getDate(); day++) {
            const currentDate = new Date(today.getFullYear(), today.getMonth(), day);
            const hasEvent = eventsInMonth.some(event => new Date(event.date).getDate() === day);
            const isToday = day === today.getDate();
            
            calendarHtml += `<div class="calendar-day ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''}">${day}</div>`;
        }

        calendarEl.innerHTML = calendarHtml;
    }

    renderClients(filter = 'all', searchTerm = '') {
        let filteredClients = this.clients;

        if (filter !== 'all') {
            filteredClients = filteredClients.filter(client => client.status === filter);
        }

        if (searchTerm) {
            filteredClients = filteredClients.filter(client => 
                client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.phone.includes(searchTerm)
            );
        }

        const clientsGrid = document.getElementById('clients-list');
        if (!clientsGrid) return;

        if (filteredClients.length === 0) {
            clientsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No clients found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        clientsGrid.innerHTML = filteredClients.map(client => {
            const hasProject = this.projects.some(p => p.clientId === client.id);
            return `
                <div class="client-card card-enter">
                    <div class="client-header">
                        <h3 class="client-name">${client.name}</h3>
                        <span class="client-status status-${client.status}">${client.status}</span>
                    </div>
                    <div class="client-info">
                        <div class="info-row">
                            <span class="info-label">📞</span>
                            <span>${client.phone}</span>
                        </div>
                        ${client.weddingDate ? `
                        <div class="info-row">
                            <span class="info-label">📅</span>
                            <span>${this.formatDate(client.weddingDate)}</span>
                        </div>` : ''}
                        ${client.venue ? `
                        <div class="info-row">
                            <span class="info-label">🏛️</span>
                            <span>${client.venue}</span>
                        </div>` : ''}
                        ${client.budget ? `
                        <div class="info-row">
                            <span class="info-label">💰</span>
                            <span>₹${client.budget.toLocaleString()}</span>
                        </div>` : ''}
                    </div>
                    ${hasProject ? '<div class="project-exists-indicator">✓ Project Created</div>' : ''}
                    <div class="client-actions">
                        <button class="btn btn--sm btn--outline" data-action="edit-client" data-id="${client.id}">Edit</button>
                        <button class="btn btn--sm btn--secondary" data-action="view-details" data-id="${client.id}">Details</button>
                        ${hasProject ? 
                            `<button class="btn btn--sm btn--primary" data-action="edit-project" data-id="${this.projects.find(p => p.clientId === client.id)?.id}">Edit Project</button>` :
                            `<button class="btn btn--sm btn--primary" data-action="create-project" data-id="${client.id}">Create Project</button>`
                        }
                    </div>
                </div>
            `;
        }).join('');

        // FIXED: Set up action listeners after rendering
        this.setupClientActionListeners();
    }

    renderPendingPayments() {
        const pendingProjects = this.projects.filter(p => p.paymentStatus !== 'completed');
        const paymentsGrid = document.getElementById('pending-payments-list');
        if (!paymentsGrid) return;

        if (pendingProjects.length === 0) {
            paymentsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No pending payments</h3>
                    <p>All projects have been fully paid.</p>
                </div>
            `;
            return;
        }

        paymentsGrid.innerHTML = pendingProjects.map(project => {
            const client = this.clients.find(c => c.id === project.clientId);
            const pendingAmount = project.finalizedAmount - project.amountPaid;
            
            return `
                <div class="client-card card-enter">
                    <div class="client-header">
                        <h3 class="client-name">${project.clientName}</h3>
                        <span class="client-status status-${project.paymentStatus}">${project.paymentStatus}</span>
                    </div>
                    <div class="client-info">
                        <div class="info-row">
                            <span class="info-label">💰</span>
                            <span>Total: ₹${project.finalizedAmount.toLocaleString()}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">✅</span>
                            <span>Paid: ₹${project.amountPaid.toLocaleString()}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">⏳</span>
                            <span>Pending: ₹${pendingAmount.toLocaleString()}</span>
                        </div>
                        ${client?.phone ? `
                        <div class="info-row">
                            <span class="info-label">📞</span>
                            <span>${client.phone}</span>
                        </div>` : ''}
                    </div>
                    <div class="client-actions">
                        <button class="btn btn--sm btn--primary" data-action="update-payment" data-id="${project.id}">Update Payment</button>
                    </div>
                </div>
            `;
        }).join('');

        this.setupClientActionListeners();
    }

    setupClientActionListeners() {
        // FIXED: Setup action listeners with proper event handling
        const actionButtons = document.querySelectorAll('[data-action]');
        console.log('Setting up client action listeners:', actionButtons.length);
        
        actionButtons.forEach((btn, index) => {
            const action = btn.dataset.action;
            const id = parseInt(btn.dataset.id);
            
            console.log(`Setting up action button ${index + 1}: ${action} for ID ${id}`);
            
            // Remove existing listeners to avoid duplicates
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Action button clicked: ${action} for ID ${id}`);
                
                switch(action) {
                    case 'edit-client':
                        this.editClient(id);
                        break;
                    case 'view-details':
                        this.viewClientDetails(id);
                        break;
                    case 'create-project':
                        this.createProjectFromClient(id);
                        break;
                    case 'edit-project':
                        this.editProject(id);
                        break;
                    case 'update-payment':
                        this.updatePayment(id);
                        break;
                    default:
                        console.log(`Unknown action: ${action}`);
                }
            });
        });
    }

    renderProjects(searchTerm = '') {
        let filteredProjects = this.projects;

        if (searchTerm) {
            filteredProjects = filteredProjects.filter(project => 
                project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.venue?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        const projectsGrid = document.getElementById('projects-list');
        if (!projectsGrid) return;

        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No projects found</h3>
                    <p>Try adjusting your search criteria or add a new project.</p>
                </div>
            `;
            return;
        }

        projectsGrid.innerHTML = filteredProjects.map(project => {
            const paymentProgress = (project.amountPaid / project.finalizedAmount) * 100;
            return `
                <div class="project-card card-enter">
                    <div class="project-header">
                        <h3 class="project-client">${project.clientName}</h3>
                        <div class="project-amount">₹${project.finalizedAmount.toLocaleString()}</div>
                    </div>
                    <div class="project-details">
                        <div class="detail-item">
                            <span class="detail-label">Wedding Date</span>
                            ${this.formatDate(project.weddingDate)}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Venue</span>
                            ${project.venue || 'TBD'}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Status</span>
                            <span class="status status--${project.projectStatus === 'in-progress' ? 'info' : project.projectStatus === 'confirmed' ? 'success' : 'warning'}">${project.projectStatus}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Payment</span>
                            <span class="status status--${project.paymentStatus === 'completed' ? 'success' : project.paymentStatus === 'partial' ? 'warning' : 'error'}">${project.paymentStatus}</span>
                        </div>
                    </div>
                    <div class="payment-progress">
                        <div class="detail-item">
                            <span class="detail-label">Payment Progress</span>
                            ₹${project.amountPaid.toLocaleString()} / ₹${project.finalizedAmount.toLocaleString()}
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${paymentProgress}%"></div>
                        </div>
                    </div>
                    ${project.images && project.images.length > 0 ? `
                    <div class="project-images">
                        ${project.images.slice(0, 4).map(image => `
                            <img src="${image.url}" alt="${image.name}" class="project-image">
                        `).join('')}
                    </div>` : ''}
                    <div class="client-actions">
                        <button class="btn btn--sm btn--outline" data-action="edit-project" data-id="${project.id}">Edit</button>
                        <button class="btn btn--sm btn--secondary" data-action="update-payment" data-id="${project.id}">Update Payment</button>
                    </div>
                </div>
            `;
        }).join('');

        this.setupClientActionListeners();
    }

    renderDesigns(filter = 'all') {
        let filteredDesigns = this.designs;

        if (filter !== 'all') {
            filteredDesigns = filteredDesigns.filter(design => design.category === filter);
        }

        const designsGrid = document.getElementById('designs-grid');
        if (!designsGrid) return;

        designsGrid.innerHTML = filteredDesigns.map(design => `
            <div class="design-card card-enter">
                <div class="design-images">
                    ${design.images && design.images.length > 0 ? 
                        design.images.slice(0, 4).map(image => `
                            <img src="${image.url}" alt="${image.name}" class="design-image">
                        `).join('') : 
                        '<div style="display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--color-text-secondary);">🎨</div>'
                    }
                </div>
                <div class="design-content">
                    <div class="design-category">${design.category}</div>
                    <div class="design-header">
                        <h3 class="design-name">${design.name}</h3>
                    </div>
                    <p class="design-description">${design.description}</p>
                    ${design.customizationNotes ? `<p class="design-customization">${design.customizationNotes}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderCalendar() {
        const monthYearEl = document.getElementById('calendar-month-year');
        const calendarGrid = document.getElementById('calendar-grid');
        
        if (!monthYearEl || !calendarGrid) return;

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        
        monthYearEl.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const today = new Date(2025, 7, 25);
        
        let calendarHtml = '';
        
        // Add day headers
        const dayHeaders = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        dayHeaders.forEach(day => {
            calendarHtml += `<div class="calendar-day-header">${day}</div>`;
        });

        // Add calendar days
        const currentDate = new Date(startDate);
        for (let i = 0; i < 42; i++) {
            const isCurrentMonth = currentDate.getMonth() === this.currentDate.getMonth();
            const isToday = currentDate.toDateString() === today.toDateString();
            const dayEvents = this.calendarEvents.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.toDateString() === currentDate.toDateString();
            });

            calendarHtml += `
                <div class="calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}" data-date="${currentDate.toISOString().split('T')[0]}">
                    <div class="calendar-day-number">${currentDate.getDate()}</div>
                    <div class="calendar-events">
                        ${dayEvents.map(event => `
                            <div class="calendar-event ${event.type}" title="${event.title}: ${event.notes || ''}" data-event-id="${event.id}" data-client-id="${event.clientId}">${event.title}</div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            currentDate.setDate(currentDate.getDate() + 1);
        }

        calendarGrid.innerHTML = calendarHtml;

        // FIXED: Add click listeners to calendar events for navigation
        setTimeout(() => {
            document.querySelectorAll('.calendar-event').forEach(eventEl => {
                eventEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const eventId = parseInt(e.target.dataset.eventId);
                    const clientId = parseInt(e.target.dataset.clientId);
                    console.log(`Calendar event clicked: ${eventId}, client: ${clientId}`);
                    this.handleCalendarEventClick(clientId);
                });
            });
        }, 100);
    }

    handleCalendarEventClick(clientId) {
        if (clientId) {
            console.log(`Navigating to client details: ${clientId}`);
            this.switchSection('clients');
            setTimeout(() => {
                this.viewClientDetails(clientId);
            }, 100);
        }
    }

    // Form validation
    validateClientForm() {
        this.clearErrors();
        let isValid = true;

        const name = this.getFieldValue('client-name');
        const phone = this.getFieldValue('client-phone');

        if (!name.trim()) {
            this.showError('client-name', 'Client name is required');
            isValid = false;
        }

        if (!phone.trim()) {
            this.showError('client-phone', 'Phone number is required');
            isValid = false;
        }

        return isValid;
    }

    validateProjectForm() {
        this.clearErrors();
        let isValid = true;

        const client = this.getFieldValue('project-client');
        const amount = this.getFieldValue('project-amount');

        if (!client) {
            this.showError('project-client', 'Please select a client');
            isValid = false;
        }

        if (!amount || amount <= 0) {
            this.showError('project-amount', 'Please enter a valid amount');
            isValid = false;
        }

        return isValid;
    }

    validateDesignForm() {
        this.clearErrors();
        let isValid = true;

        const name = this.getFieldValue('design-name');
        const category = this.getFieldValue('design-category');
        const imageFiles = document.getElementById('design-images').files;

        if (!name.trim()) {
            this.showError('design-name', 'Design name is required');
            isValid = false;
        }

        if (!category) {
            this.showError('design-category', 'Please select a category');
            isValid = false;
        }

        if (!this.editingDesign && imageFiles.length === 0) {
            this.showError('design-images', 'Please upload at least one design image');
            isValid = false;
        }

        return isValid;
    }

    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(fieldId + '-error');
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
    }

    clearErrors() {
        document.querySelectorAll('.form-control.error').forEach(field => {
            field.classList.remove('error');
        });
        
        document.querySelectorAll('.form-error').forEach(error => {
            error.style.display = 'none';
        });
    }

    // Auto-update payment status - FIXED VERSION
    updatePaymentStatusInForm() {
        const amountField = document.getElementById('project-amount');
        const advanceField = document.getElementById('project-advance');
        const statusField = document.getElementById('project-payment-status');

        if (!amountField || !advanceField || !statusField) return;

        const totalAmount = parseFloat(amountField.value) || 0;
        const advanceAmount = parseFloat(advanceField.value) || 0;

        let status = 'pending';
        
        if (totalAmount > 0) {
            if (advanceAmount === 0) {
                status = 'pending';
            } else if (advanceAmount >= totalAmount) {
                status = 'completed';
            } else {
                status = 'partial';
            }
        }

        statusField.value = status;
    }

    // Auto-update client status based on payment
    updateClientStatus(clientId) {
        const client = this.clients.find(c => c.id === clientId);
        const project = this.projects.find(p => p.clientId === clientId);
        
        if (client && project) {
            if (project.paymentStatus === 'completed') {
                client.status = 'confirmed';
            } else if (project.paymentStatus === 'partial') {
                client.status = 'partial';
            }
            this.updateCalendarFromClients();
            this.renderClients();
            this.renderDashboard();
        }
    }

    calculatePaymentStatus(totalAmount, advanceAmount) {
        if (totalAmount <= 0) return 'pending';
        if (advanceAmount === 0) return 'pending';
        if (advanceAmount >= totalAmount) return 'completed';
        return 'partial';
    }

    // Save functions with proper validation
    saveClient() {
        console.log('Saving client...');
        if (!this.validateClientForm()) return;

        const clientData = {
            name: this.getFieldValue('client-name'),
            phone: this.getFieldValue('client-phone'),
            weddingDate: this.getFieldValue('client-wedding-date') || null,
            venue: this.getFieldValue('client-venue') || '',
            budget: parseInt(this.getFieldValue('client-budget')) || 0,
            status: 'inquiry',
            followUpDate: this.getFieldValue('client-followup-date') || null,
            meetingDate: this.getFieldValue('client-meeting-date') || null,
            notes: this.getFieldValue('client-notes') || '',
            createdDate: new Date().toISOString().split('T')[0],
            elementSheet: {
                textContent: '',
                uploadedFiles: [],
                lastUpdated: new Date().toISOString().split('T')[0]
            },
            costSheet: {
                royalty: 0, labour: 0, transport: 0, newPurchase: 0,
                lights: 0, floral: 0, generators: 0, linens: 0,
                misc: 0, otherExpenses: 0,
                lastUpdated: new Date().toISOString().split('T')[0]
            }
        };

        if (this.editingClient) {
            const clientIndex = this.clients.findIndex(c => c.id === this.editingClient.id);
            if (clientIndex !== -1) {
                this.clients[clientIndex] = { ...this.clients[clientIndex], ...clientData };
            }
        } else {
            clientData.id = this.nextId.client++;
            this.clients.push(clientData);
        }

        this.updateCalendarFromClients();
        this.renderClients();
        this.renderDashboard();
        this.renderCalendar();
        this.populateDropdowns();
        this.closeModal(document.getElementById('client-modal'));
        this.showSuccessMessage(this.editingClient ? 'Client updated successfully!' : 'Client added successfully!');
        console.log('Client saved successfully');
    }

    saveProject() {
        console.log('Saving project...');
        if (!this.validateProjectForm()) return;

        const clientId = parseInt(this.getFieldValue('project-client'));
        const client = this.clients.find(c => c.id === clientId);
        
        if (!client) {
            this.showError('project-client', 'Selected client not found');
            return;
        }

        // Check one project per client rule
        const existingProject = this.projects.find(p => p.clientId === clientId);
        if (existingProject && (!this.editingProject || existingProject.id !== this.editingProject.id)) {
            this.showError('project-client', 'This client already has a project. Edit the existing one.');
            return;
        }

        const totalAmount = parseFloat(this.getFieldValue('project-amount'));
        const advanceAmount = parseFloat(this.getFieldValue('project-advance')) || 0;
        const paymentStatus = this.calculatePaymentStatus(totalAmount, advanceAmount);

        // Handle multiple image uploads
        const imageFiles = document.getElementById('project-images').files;
        const images = [];
        
        if (imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const reader = new FileReader();
                reader.onload = (e) => {
                    images.push({
                        id: Date.now() + i,
                        name: file.name,
                        url: e.target.result,
                        uploadDate: new Date().toISOString().split('T')[0]
                    });
                    
                    if (images.length === imageFiles.length) {
                        this.processProjectSave(clientId, client, totalAmount, advanceAmount, paymentStatus, images);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            this.processProjectSave(clientId, client, totalAmount, advanceAmount, paymentStatus, this.editingProject ? this.editingProject.images || [] : []);
        }
    }

    processProjectSave(clientId, client, totalAmount, advanceAmount, paymentStatus, images) {
        const projectData = {
            clientId: clientId,
            clientName: client.name,
            venue: client.venue,
            weddingDate: client.weddingDate,
            images: images,
            finalizedAmount: totalAmount,
            paymentStatus: paymentStatus,
            amountPaid: advanceAmount,
            projectStatus: 'confirmed'
        };

        if (this.editingProject) {
            const projectIndex = this.projects.findIndex(p => p.id === this.editingProject.id);
            if (projectIndex !== -1) {
                this.projects[projectIndex] = { ...this.projects[projectIndex], ...projectData };
            }
        } else {
            projectData.id = this.nextId.project++;
            this.projects.push(projectData);
        }

        // Update client status based on payment
        this.updateClientStatus(clientId);

        this.renderProjects();
        this.renderClients();
        this.renderDashboard();
        this.closeModal(document.getElementById('project-modal'));
        this.showSuccessMessage(this.editingProject ? 'Project updated successfully!' : 'Project created successfully!');
        console.log('Project saved successfully');
    }

    saveDesign() {
        console.log('Saving design...');
        if (!this.validateDesignForm()) return;

        const imageFiles = document.getElementById('design-images').files;
        const images = [];

        if (imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const reader = new FileReader();
                reader.onload = (e) => {
                    images.push({
                        id: Date.now() + i,
                        name: file.name,
                        url: e.target.result,
                        uploadDate: new Date().toISOString().split('T')[0]
                    });
                    
                    if (images.length === imageFiles.length) {
                        this.processDesignSave(images);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else if (this.editingDesign) {
            this.processDesignSave(this.editingDesign.images || []);
        }
    }

    processDesignSave(images) {
        const designData = {
            name: this.getFieldValue('design-name'),
            category: this.getFieldValue('design-category'),
            description: this.getFieldValue('design-description') || '',
            customizationNotes: this.getFieldValue('design-customization') || '',
            images: images,
            customizable: true,
            createdDate: new Date().toISOString().split('T')[0],
            createdBy: 'Design Team'
        };

        if (this.editingDesign) {
            const designIndex = this.designs.findIndex(d => d.id === this.editingDesign.id);
            if (designIndex !== -1) {
                this.designs[designIndex] = { ...this.designs[designIndex], ...designData };
            }
        } else {
            designData.id = this.nextId.design++;
            this.designs.push(designData);
        }

        this.renderDesigns();
        this.closeModal(document.getElementById('design-modal'));
        this.showSuccessMessage(this.editingDesign ? 'Design updated successfully!' : 'Design uploaded successfully!');
        console.log('Design saved successfully');
    }

    saveEvent() {
        const eventData = {
            title: this.getFieldValue('event-title'),
            type: this.getFieldValue('event-type'),
            date: this.getFieldValue('event-date'),
            clientId: parseInt(this.getFieldValue('event-client')) || null,
            venue: this.getFieldValue('event-venue') || '',
            notes: this.getFieldValue('event-notes') || ''
        };

        if (!eventData.title.trim()) {
            this.showError('event-title', 'Event title is required');
            return;
        }

        if (!eventData.date) {
            this.showError('event-date', 'Event date is required');
            return;
        }

        if (this.editingEvent) {
            const eventIndex = this.calendarEvents.findIndex(e => e.id === this.editingEvent.id);
            if (eventIndex !== -1) {
                this.calendarEvents[eventIndex] = { ...this.calendarEvents[eventIndex], ...eventData };
            }
        } else {
            eventData.id = this.nextId.event++;
            this.calendarEvents.push(eventData);
        }

        this.renderCalendar();
        this.renderDashboard();
        this.closeModal(document.getElementById('event-modal'));
        this.showSuccessMessage(this.editingEvent ? 'Event updated successfully!' : 'Event added successfully!');
    }

    saveElementSheet() {
        if (!this.currentClientDetails) return;

        const content = document.getElementById('element-sheet-content').value;
        
        this.currentClientDetails.elementSheet.textContent = content;
        this.currentClientDetails.elementSheet.lastUpdated = new Date().toISOString().split('T')[0];

        this.showSuccessMessage('Element sheet saved successfully!');
    }

    downloadElementSheet() {
        if (!this.currentClientDetails) return;

        const content = this.currentClientDetails.elementSheet.textContent || 'No content available';
        const blob = new Blob([content], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentClientDetails.name.replace(/[^a-z0-9]/gi, '_')}_element_sheet.doc`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showSuccessMessage('Element sheet downloaded successfully!');
    }

    saveCostSheet() {
        if (!this.currentClientDetails) return;

        const costData = {
            royalty: parseFloat(document.getElementById('cost-royalty').value) || 0,
            labour: parseFloat(document.getElementById('cost-labour').value) || 0,
            transport: parseFloat(document.getElementById('cost-transport').value) || 0,
            newPurchase: parseFloat(document.getElementById('cost-new-purchase').value) || 0,
            lights: parseFloat(document.getElementById('cost-lights').value) || 0,
            floral: parseFloat(document.getElementById('cost-floral').value) || 0,
            generators: parseFloat(document.getElementById('cost-generators').value) || 0,
            linens: parseFloat(document.getElementById('cost-linens').value) || 0,
            misc: parseFloat(document.getElementById('cost-misc').value) || 0,
            otherExpenses: parseFloat(document.getElementById('cost-other-expenses').value) || 0,
            lastUpdated: new Date().toISOString().split('T')[0]
        };

        this.currentClientDetails.costSheet = costData;
        this.showSuccessMessage('Cost sheet saved successfully!');
    }

    updateTotalCost() {
        const costInputs = [
            'cost-royalty', 'cost-labour', 'cost-transport', 'cost-new-purchase',
            'cost-lights', 'cost-floral', 'cost-generators', 'cost-linens',
            'cost-misc', 'cost-other-expenses'
        ];

        let total = 0;
        costInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                total += parseFloat(input.value) || 0;
            }
        });

        const totalEl = document.getElementById('total-cost');
        if (totalEl) {
            totalEl.textContent = `₹${total.toLocaleString()}`;
        }
    }

    // Modal functions - FIXED
    openClientModal(client = null) {
        console.log('Opening client modal...', client ? 'Edit' : 'New');
        
        const modal = document.getElementById('client-modal');
        const title = document.getElementById('client-modal-title');
        
        this.editingClient = client;
        
        if (client) {
            title.textContent = 'Edit Client';
            this.populateClientForm(client);
        } else {
            title.textContent = 'Add New Client';
            this.resetClientForm();
        }
        
        modal.classList.remove('hidden');
        console.log('Client modal opened');
    }

    openProjectModal(project = null) {
        console.log('Opening project modal...', project ? 'Edit' : 'New');
        
        const modal = document.getElementById('project-modal');
        const title = document.getElementById('project-modal-title');
        
        this.editingProject = project;
        this.populateDropdowns();
        
        if (project) {
            title.textContent = 'Edit Project';
            setTimeout(() => {
                this.populateProjectForm(project);
                this.updatePaymentStatusInForm();
            }, 50);
        } else {
            title.textContent = 'Add New Project';
            setTimeout(() => {
                this.resetProjectForm();
                this.updatePaymentStatusInForm();
            }, 50);
        }
        
        modal.classList.remove('hidden');
        console.log('Project modal opened');
    }

    openDesignModal(design = null) {
        console.log('Opening design modal...', design ? 'Edit' : 'New');
        
        const modal = document.getElementById('design-modal');
        const title = document.getElementById('design-modal-title');
        
        this.editingDesign = design;
        
        if (design) {
            title.textContent = 'Edit Design';
            this.populateDesignForm(design);
        } else {
            title.textContent = 'Upload New Design';
            this.resetDesignForm();
        }
        
        modal.classList.remove('hidden');
        console.log('Design modal opened');
    }

    openEventModal(event = null) {
        const modal = document.getElementById('event-modal');
        const title = document.getElementById('event-modal-title');
        
        this.editingEvent = event;
        this.populateEventClientDropdown();
        
        if (event) {
            title.textContent = 'Edit Event';
            setTimeout(() => {
                this.populateEventForm(event);
            }, 50);
        } else {
            title.textContent = 'Add New Event';
            this.resetEventForm();
        }
        
        modal.classList.remove('hidden');
    }

    viewClientDetails(clientId) {
        const client = this.clients.find(c => c.id === clientId);
        if (!client) return;

        this.currentClientDetails = client;
        
        const modal = document.getElementById('client-details-modal');
        const title = document.getElementById('client-details-title');
        
        title.textContent = `${client.name} - Details`;
        
        this.populateClientDetails(client);
        this.switchTab('info');
        
        // Setup tab listeners
        setTimeout(() => {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tabName = e.target.dataset.tab;
                    this.switchTab(tabName);
                });
            });
        }, 100);
        
        modal.classList.remove('hidden');
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('active');
        }

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        const activeTabContent = document.getElementById(`client-${tabName}-tab`);
        if (activeTabContent) {
            activeTabContent.classList.add('active');
        }

        if (tabName === 'elements' && this.currentClientDetails) {
            this.loadElementSheet();
        } else if (tabName === 'cost' && this.currentClientDetails) {
            this.loadCostSheet();
        }
    }

    populateClientDetails(client) {
        const contentEl = document.getElementById('client-details-content');
        if (!contentEl) return;

        contentEl.innerHTML = `
            <div class="client-info">
                <div class="info-row">
                    <span class="info-label"><strong>Phone:</strong></span>
                    <span>${client.phone}</span>
                </div>
                ${client.weddingDate ? `
                <div class="info-row">
                    <span class="info-label"><strong>Wedding Date:</strong></span>
                    <span>${this.formatDate(client.weddingDate)}</span>
                </div>` : ''}
                ${client.venue ? `
                <div class="info-row">
                    <span class="info-label"><strong>Venue:</strong></span>
                    <span>${client.venue}</span>
                </div>` : ''}
                ${client.budget ? `
                <div class="info-row">
                    <span class="info-label"><strong>Budget:</strong></span>
                    <span>₹${client.budget.toLocaleString()}</span>
                </div>` : ''}
                <div class="info-row">
                    <span class="info-label"><strong>Status:</strong></span>
                    <span class="client-status status-${client.status}">${client.status}</span>
                </div>
                ${client.followUpDate ? `
                <div class="info-row">
                    <span class="info-label"><strong>Follow-up Date:</strong></span>
                    <span>${this.formatDate(client.followUpDate)}</span>
                </div>` : ''}
                ${client.meetingDate ? `
                <div class="info-row">
                    <span class="info-label"><strong>Meeting Date:</strong></span>
                    <span>${this.formatDate(client.meetingDate)}</span>
                </div>` : ''}
                ${client.notes ? `
                <div class="info-row">
                    <span class="info-label"><strong>Notes:</strong></span>
                    <span>${client.notes}</span>
                </div>` : ''}
            </div>
        `;
    }

    loadElementSheet() {
        const client = this.currentClientDetails;
        if (!client || !client.elementSheet) return;

        const contentEl = document.getElementById('element-sheet-content');
        const filesEl = document.getElementById('uploaded-files');
        
        if (contentEl) {
            contentEl.value = client.elementSheet.textContent || '';
        }
        
        if (filesEl && client.elementSheet.uploadedFiles) {
            filesEl.innerHTML = client.elementSheet.uploadedFiles.map(file => `
                <div class="file-item">
                    <span>📎 ${file}</span>
                    <button class="btn btn--sm btn--outline">Download</button>
                </div>
            `).join('');
        }
    }

    loadCostSheet() {
        const client = this.currentClientDetails;
        if (!client || !client.costSheet) return;

        const costFields = {
            'cost-royalty': client.costSheet.royalty || 0,
            'cost-labour': client.costSheet.labour || 0,
            'cost-transport': client.costSheet.transport || 0,
            'cost-new-purchase': client.costSheet.newPurchase || 0,
            'cost-lights': client.costSheet.lights || 0,
            'cost-floral': client.costSheet.floral || 0,
            'cost-generators': client.costSheet.generators || 0,
            'cost-linens': client.costSheet.linens || 0,
            'cost-misc': client.costSheet.misc || 0,
            'cost-other-expenses': client.costSheet.otherExpenses || 0
        };

        Object.keys(costFields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = costFields[fieldId];
            }
        });

        this.updateTotalCost();
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
        }
        this.editingClient = null;
        this.editingProject = null;
        this.editingDesign = null;
        this.editingEvent = null;
        this.currentClientDetails = null;
        this.clearErrors();
    }

    // Action handlers - FIXED
    editClient(clientId) {
        console.log(`Edit client: ${clientId}`);
        const client = this.clients.find(c => c.id === clientId);
        this.openClientModal(client);
    }

    editProject(projectId) {
        console.log(`Edit project: ${projectId}`);
        const project = this.projects.find(p => p.id === projectId);
        this.openProjectModal(project);
    }

    createProjectFromClient(clientId) {
        console.log(`Create project for client: ${clientId}`);
        const client = this.clients.find(c => c.id === clientId);
        this.openProjectModal();
        
        setTimeout(() => {
            const clientField = document.getElementById('project-client');
            const amountField = document.getElementById('project-amount');
            if (clientField) {
                clientField.value = clientId;
            }
            if (amountField && client.budget) {
                amountField.value = client.budget;
            }
            this.updatePaymentStatusInForm();
        }, 100);
    }

    updatePayment(projectId) {
        console.log(`Update payment for project: ${projectId}`);
        const project = this.projects.find(p => p.id === projectId);
        const newAmount = prompt(`Current paid: ₹${project.amountPaid.toLocaleString()}\nTotal: ₹${project.finalizedAmount.toLocaleString()}\n\nEnter new paid amount:`, project.amountPaid);
        
        if (newAmount !== null && !isNaN(newAmount)) {
            const paidAmount = parseFloat(newAmount);
            project.amountPaid = paidAmount;
            project.paymentStatus = this.calculatePaymentStatus(project.finalizedAmount, paidAmount);
            
            this.updateClientStatus(project.clientId);
            this.renderProjects();
            this.renderClients();
            this.renderDashboard();
            this.renderPendingPayments();
            this.showSuccessMessage('Payment updated successfully!');
        }
    }

    // Filter and search
    handleFilterTab(tab) {
        const tabGroup = tab.parentElement;
        tabGroup.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        
        if (this.currentSection === 'clients') {
            this.renderClients(filter);
        } else if (this.currentSection === 'designs') {
            this.renderDesigns(filter);
        }
    }

    searchClients(searchTerm) {
        const activeFilter = document.querySelector('#clients .filter-tab.active');
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        this.renderClients(filter, searchTerm);
    }

    searchProjects(searchTerm) {
        this.renderProjects(searchTerm);
    }

    // Utility functions
    populateDropdowns() {
        this.populateClientDropdown();
        this.populateEventClientDropdown();
    }

    populateClientDropdown() {
        const select = document.getElementById('project-client');
        if (select) {
            const currentValue = select.value;
            select.innerHTML = '<option value="">Select a client</option>' +
                this.clients.map(client => 
                    `<option value="${client.id}">${client.name}</option>`
                ).join('');
            
            if (currentValue && this.clients.some(c => c.id == currentValue)) {
                select.value = currentValue;
            }
        }
    }

    populateEventClientDropdown() {
        const select = document.getElementById('event-client');
        if (select) {
            const currentValue = select.value;
            select.innerHTML = '<option value="">Select a client</option>' +
                this.clients.map(client => 
                    `<option value="${client.id}">${client.name}</option>`
                ).join('');
            
            if (currentValue && this.clients.some(c => c.id == currentValue)) {
                select.value = currentValue;
            }
        }
    }

    previewMultipleImages(input, previewId) {
        const preview = document.getElementById(previewId);
        if (!preview) return;

        const files = input.files;
        preview.innerHTML = '';
        
        if (files.length > 0) {
            for (let i = 0; i < Math.min(files.length, 6); i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    populateClientForm(client) {
        const fields = {
            'client-name': client.name,
            'client-phone': client.phone,
            'client-wedding-date': client.weddingDate,
            'client-venue': client.venue,
            'client-budget': client.budget,
            'client-followup-date': client.followUpDate,
            'client-meeting-date': client.meetingDate,
            'client-notes': client.notes
        };

        Object.keys(fields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && fields[fieldId]) {
                field.value = fields[fieldId];
            }
        });
    }

    populateProjectForm(project) {
        const fields = {
            'project-client': project.clientId,
            'project-amount': project.finalizedAmount,
            'project-advance': project.amountPaid
        };

        Object.keys(fields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && fields[fieldId] !== undefined) {
                field.value = fields[fieldId];
            }
        });
    }

    populateDesignForm(design) {
        const fields = {
            'design-name': design.name,
            'design-category': design.category,
            'design-description': design.description,
            'design-customization': design.customizationNotes
        };

        Object.keys(fields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && fields[fieldId]) {
                field.value = fields[fieldId];
            }
        });
    }

    populateEventForm(event) {
        const fields = {
            'event-title': event.title,
            'event-type': event.type,
            'event-date': event.date,
            'event-client': event.clientId || '',
            'event-venue': event.venue || '',
            'event-notes': event.notes || ''
        };

        Object.keys(fields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = fields[fieldId];
            }
        });
    }

    resetClientForm() {
        const form = document.getElementById('client-form');
        if (form) form.reset();
        this.clearErrors();
    }

    resetProjectForm() {
        const form = document.getElementById('project-form');
        if (form) form.reset();
        const statusField = document.getElementById('project-payment-status');
        if (statusField) {
            statusField.value = 'pending';
        }
        this.clearErrors();
    }

    resetDesignForm() {
        const form = document.getElementById('design-form');
        if (form) form.reset();
        const preview = document.getElementById('design-image-preview');
        if (preview) preview.innerHTML = '';
        this.clearErrors();
    }

    resetEventForm() {
        const form = document.getElementById('event-form');
        if (form) form.reset();
        this.clearErrors();
    }

    getFieldValue(fieldId) {
        const field = document.getElementById(fieldId);
        return field ? field.value : '';
    }

    updateElement(id, content) {
        const el = document.getElementById(id);
        if (el) el.textContent = content;
    }

    showSuccessMessage(message) {
        const successToast = document.getElementById('success-message');
        const successText = document.getElementById('success-text');
        
        if (successToast && successText) {
            successText.textContent = message;
            successToast.classList.remove('hidden');
            
            setTimeout(() => {
                successToast.classList.add('hidden');
            }, 3000);
        }
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Wedding CRM...');
    window.app = new WeddingCRM();
});