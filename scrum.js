document.addEventListener('DOMContentLoaded', () => {
    
    // Sample SE Tickets
    const initialTickets = [
        { id: 'TKT-101', type: 'story', title: 'Design Multi-Region Active-Active DB Failover', points: 8, status: 'todo', desc: 'The client requires a sub-second RTO across two regions.' },
        { id: 'TKT-102', type: 'spike', title: 'Investigate Transit Gateway Pricing at scale', points: 3, status: 'todo', desc: 'Customer balked at the TGW pricing estimate. We need a definitive model for 50+ VPCs.' },
        { id: 'TKT-103', type: 'bug', title: 'IAM Role missing KMS decrypt permission in POC', points: 2, status: 'todo', desc: 'Lambda function in the POC environment is failing to read from Parameter Store SecureString.' },
        { id: 'TKT-104', type: 'story', title: 'Prepare SOC 2 architecture response for CISO', points: 5, status: 'todo', desc: 'Need to map our AWS architecture to the 5 Trust Service Criteria.' },
        { id: 'TKT-105', type: 'story', title: 'Execute "Tell-Show-Tell" demo for VP of Eng', points: 5, status: 'todo', desc: 'Focus the demo explicitly on their 40-hour compliance manual review pain point.' }
    ];

    const coachOutput = document.getElementById('coach-output');

    // Native HTML5 drag-and-drop (dragstart/dragover/drop below) doesn't fire at all
    // on touchscreens, so it's the only way to move tickets on mobile/tablet. This
    // tracks a tap-selected ticket so tapping a column moves it there instead —
    // same tap-to-select-then-tap-target pattern as the Gym's Architecture Lab.
    let selectedTicketId = null;

    function addCoachMessage(text, type = 'normal') {
        const msg = document.createElement('div');
        msg.className = `coach-message ${type}`;
        msg.innerHTML = text;
        coachOutput.prepend(msg);
    }

    function setSelectedTicket(ticketId) {
        selectedTicketId = ticketId;
        document.querySelectorAll('.ticket').forEach(el => el.classList.toggle('selected', el.id === ticketId));
        document.querySelectorAll('.column-body').forEach(col => col.classList.toggle('move-target', !!ticketId));
    }

    function moveTicket(ticketObj, newStatus) {
        if (!ticketObj || ticketObj.status === newStatus) return;
        handleStatusChange(ticketObj, ticketObj.status, newStatus);
        ticketObj.status = newStatus;
        renderTickets();
    }

    function renderTickets() {
        // Clear all columns
        document.querySelectorAll('.column-body').forEach(col => col.innerHTML = '');

        initialTickets.forEach(ticket => {
            const el = document.createElement('div');
            el.className = `ticket ${ticket.type}`;
            el.draggable = true;
            el.id = ticket.id;

            el.innerHTML = `
                <span class="ticket-id">${ticket.id} (${ticket.type.toUpperCase()})</span>
                <div class="ticket-title">${ticket.title}</div>
                <div class="ticket-footer">
                    <span class="ticket-points">${ticket.points} pts</span>
                </div>
            `;

            // Drag Start
            el.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', ticket.id);
                setTimeout(() => el.classList.add('dragging'), 0);
            });

            // Drag End
            el.addEventListener('dragend', () => {
                el.classList.remove('dragging');
                document.querySelectorAll('.column-body').forEach(col => col.classList.remove('drag-over'));
            });

            // Tap/click: show coaching, and toggle this ticket as the one to move
            // (tap it again, or tap elsewhere after moving, to deselect).
            el.addEventListener('click', () => {
                handleTicketClick(ticket);
                setSelectedTicket(selectedTicketId === ticket.id ? null : ticket.id);
            });

            const column = document.querySelector(`.column-body[data-status="${ticket.status}"]`);
            if (column) column.appendChild(el);
        });

        if (selectedTicketId) setSelectedTicket(selectedTicketId);
        updateCounts();
    }

    function updateCounts() {
        ['todo', 'sprint', 'progress', 'review', 'done'].forEach(status => {
            const count = document.querySelector(`.column-body[data-status="${status}"]`).children.length;
            document.getElementById(`count-${status}`).innerText = count;
        });
    }

    // Drag and Drop Logic for Columns (mouse/trackpad) + tap-to-move (touch)
    document.querySelectorAll('.column-body').forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            column.classList.add('drag-over');
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });

        column.addEventListener('drop', e => {
            e.preventDefault();
            column.classList.remove('drag-over');

            const ticketId = e.dataTransfer.getData('text/plain');
            const ticketObj = initialTickets.find(t => t.id === ticketId);
            moveTicket(ticketObj, column.getAttribute('data-status'));
        });

        // Tap-to-move: only acts when a ticket is currently selected, so tapping
        // an empty column area otherwise does nothing.
        column.addEventListener('click', (e) => {
            if (!selectedTicketId || e.target.closest('.ticket')) return;
            const ticketObj = initialTickets.find(t => t.id === selectedTicketId);
            moveTicket(ticketObj, column.getAttribute('data-status'));
            setSelectedTicket(null);
        });
    });

    // --- COACHING LOGIC --- //
    
    function handleTicketClick(ticket) {
        addCoachMessage(`
            <strong>Inspecting ${ticket.id}</strong><br>
            <em>${ticket.desc}</em><br><br>
            <strong>Scrum PSM 1 Rule:</strong> The Developers are responsible for sizing (estimating) this item. The Product Owner cannot force a sizing on them. 
        `, 'normal');
    }
    
    function handleStatusChange(ticket, oldStatus, newStatus) {
        if (oldStatus === 'todo' && newStatus === 'sprint') {
            addCoachMessage(`
                <strong>Sprint Planning Event Triggered</strong><br>
                By moving an item from the Product Backlog to the Sprint Backlog, you are engaging in Sprint Planning.<br><br>
                <strong>Exam Tip:</strong> Only the Developers determine how many items are pulled into the Sprint Backlog.
            `, 'success');
        }
        else if (newStatus === 'progress') {
            const progressCount = document.querySelector(`.column-body[data-status="progress"]`).children.length;
            if (progressCount >= 2) { // Simulate WIP limit warning
                addCoachMessage(`
                    <strong>WIP Limit Warning!</strong><br>
                    You have multiple items in progress. Lean thinking dictates we should limit Work In Progress to increase throughput.<br><br>
                    <strong>Exam Tip:</strong> While Scrum doesn't explicitly mandate numerical WIP limits like Kanban does, <em>Focus</em> is a core Scrum Value. Stop starting, start finishing.
                `, 'warning');
            } else {
                addCoachMessage(`
                    <strong>Daily Scrum Focus</strong><br>
                    This item is now in progress. The Developers will inspect progress on this item during the 15-minute Daily Scrum and adapt their plan for the next 24 hours.
                `, 'normal');
            }
        }
        else if (newStatus === 'done') {
            addCoachMessage(`
                <strong>Definition of Done (DoD)</strong><br>
                By moving this to "Done", you assert that it meets the DoD. An <strong>Increment</strong> is born the moment it meets the DoD.<br><br>
                <strong>Exam Tip:</strong> If it doesn't meet the DoD, it returns to the Product Backlog. You cannot present "almost done" work at the Sprint Review.
            `, 'success');
        }
        else if (newStatus === 'todo' && oldStatus !== 'todo') {
            addCoachMessage(`
                <strong>Returning to Product Backlog</strong><br>
                If an item is not finished by the end of the Sprint timebox, it must return to the Product Backlog. Sprints cannot be extended to finish work.
            `, 'warning');
        }
    }

    // Initial render
    renderTickets();
});
