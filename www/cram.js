/**
 * Mammoth Academy — Exam-Eve Cram Sheets (cram.js; loaded by library.html and gym.html)
 *
 * A searchable quick-reference drawer of brute-force exam facts: ports, a computed CIDR matrix, Wi-Fi/cabling/fiber
 * standards, AWS hard limits and storage tiers, and the ordered processes the exams love (troubleshooting, malware
 * removal, laser imaging, incident response, Scrum events). All static, so it works offline.
 *
 * Numbers follow the current objectives (N10-009, SY0-701, 220-1201/1202, SAA-C03, Scrum Guide 2020). Where AWS has
 * raised a limit recently, the row says what the exam expects.
 */
const Cram = (function () {
    'use strict';

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    // ── CIDR matrix, computed rather than typed so no mask or host count can be wrong ──
    function cidrRows() {
        const rows = [];
        for (let n = 16; n <= 32; n++) {
            const mask = n === 0 ? 0 : (~0 << (32 - n)) >>> 0;
            const dotted = [24, 16, 8, 0].map(s => (mask >>> s) & 255).join('.');
            const total = Math.pow(2, 32 - n);
            const usable = n <= 30 ? (total - 2).toLocaleString() : n === 31 ? '2 (point-to-point, RFC 3021)' : '1 (single host route)';
            const block = n <= 16 ? '1 in the 2nd octet' : n <= 24 ? `${Math.pow(2, 24 - n)} in the 3rd octet` : `${Math.pow(2, 32 - n)} in the 4th octet`;
            const cls = n === 16 ? '1 Class B = 256 × /24' : n < 24 ? `${Math.pow(2, 24 - n)} × Class C (/24)` : n === 24 ? '1 Class C' : `1/${Math.pow(2, n - 24)} of a Class C`;
            rows.push(['/' + n, dotted, total.toLocaleString(), usable, block, cls]);
        }
        return rows;
    }

    const SHEETS = [
        {
            id: 'ports', title: 'Ports & Protocols', icon: '🔌', exams: 'Network+ · Security+ · A+',
            columns: ['Port', 'TCP/UDP', 'Protocol', 'Exam note'],
            rows: [
                ['20, 21', 'TCP', 'FTP', 'Cleartext. 21 = control, 20 = data (active mode). Replace with SFTP/FTPS.'],
                ['22', 'TCP', 'SSH / SFTP / SCP', 'Encrypted remote shell and file transfer. The secure answer to Telnet and FTP.'],
                ['23', 'TCP', 'Telnet', 'Cleartext credentials. Always the "disable this" answer.'],
                ['25', 'TCP', 'SMTP', 'Server-to-server mail relay.'],
                ['587', 'TCP', 'SMTP submission', 'Client mail submission with STARTTLS and authentication.'],
                ['49', 'TCP', 'TACACS+', 'Device-admin AAA; encrypts the whole payload; per-command authorization.'],
                ['53', 'TCP/UDP', 'DNS', 'UDP for queries; TCP for zone transfers and large responses.'],
                ['67, 68', 'UDP', 'DHCP', '67 = server, 68 = client. APIPA 169.254.x.x when no server answers.'],
                ['69', 'UDP', 'TFTP', 'No authentication. Config/firmware transfers, PXE boot.'],
                ['80', 'TCP', 'HTTP', 'Cleartext web.'],
                ['88', 'TCP/UDP', 'Kerberos', 'Active Directory ticket-based authentication.'],
                ['110', 'TCP', 'POP3', 'Downloads mail to one device.'],
                ['995', 'TCP', 'POP3S', 'POP3 over TLS.'],
                ['123', 'UDP', 'NTP', 'Clock sync; log correlation and Kerberos depend on it.'],
                ['137–139', 'TCP/UDP', 'NetBIOS', 'Legacy Windows name/session services.'],
                ['143', 'TCP', 'IMAP', 'Keeps mail synced on the server across devices.'],
                ['993', 'TCP', 'IMAPS', 'IMAP over TLS.'],
                ['161', 'UDP', 'SNMP', 'Manager polls agents. Use SNMPv3 (authentication + encryption).'],
                ['162', 'UDP', 'SNMP traps', 'Agents push unsolicited alerts to the manager.'],
                ['179', 'TCP', 'BGP', 'Path-vector routing between autonomous systems.'],
                ['389', 'TCP/UDP', 'LDAP', 'Directory queries, cleartext.'],
                ['636', 'TCP', 'LDAPS', 'LDAP over TLS.'],
                ['443', 'TCP (UDP for QUIC)', 'HTTPS', 'TLS web; also SSL/TLS VPNs. HTTP/3 uses QUIC on UDP 443.'],
                ['445', 'TCP', 'SMB', 'Windows file/printer sharing. Lateral-movement and ransomware favourite.'],
                ['514', 'UDP', 'Syslog', 'Central logging. (TLS syslog uses TCP 6514.)'],
                ['1433', 'TCP', 'Microsoft SQL Server', 'Database; never expose to the internet.'],
                ['1812, 1813', 'UDP', 'RADIUS', '1812 = authentication, 1813 = accounting. Network-access AAA (802.1X, VPN, Wi-Fi).'],
                ['3389', 'TCP/UDP', 'RDP', 'Remote Desktop. Put it behind a VPN or gateway, never open to the internet.'],
                ['5060', 'TCP/UDP', 'SIP', 'VoIP call signaling.'],
                ['5061', 'TCP', 'SIP over TLS', 'Encrypted VoIP signaling.']
            ]
        },
        {
            id: 'cidr', title: 'CIDR & Subnetting', icon: '🧮', exams: 'Network+ · A+',
            note: 'Usable hosts = 2<sup>host bits</sup> − 2 (network and broadcast addresses). Block size is the jump between subnets in the octet that changes.',
            columns: ['Prefix', 'Mask', 'Total IPs', 'Usable hosts', 'Block size', 'Class equivalent'],
            rows: cidrRows()
        },
        {
            id: 'wifi', title: 'Wi-Fi, Cabling & Fiber', icon: '📶', exams: 'Network+ · A+',
            groups: [
                {
                    title: 'IEEE 802.11 Wi-Fi',
                    columns: ['Standard', 'Bands', 'Max data rate', 'Note'],
                    rows: [
                        ['802.11a', '5 GHz', '54 Mbps', 'OFDM; less congested band, shorter range.'],
                        ['802.11b', '2.4 GHz', '11 Mbps', 'Legacy.'],
                        ['802.11g', '2.4 GHz', '54 Mbps', 'Backward compatible with b.'],
                        ['802.11n (Wi-Fi 4)', '2.4 + 5 GHz', '600 Mbps', 'MIMO; 40 MHz channels.'],
                        ['802.11ac (Wi-Fi 5)', '5 GHz only', '~6.9 Gbps', 'Downlink MU-MIMO; up to 160 MHz channels.'],
                        ['802.11ax (Wi-Fi 6)', '2.4 + 5 GHz', '~9.6 Gbps', 'OFDMA, uplink + downlink MU-MIMO, target wake time.'],
                        ['802.11ax (Wi-Fi 6E)', '2.4 + 5 + 6 GHz', '~9.6 Gbps', 'Same standard, adds the 6 GHz band.'],
                        ['802.11be (Wi-Fi 7)', '2.4 + 5 + 6 GHz', '~46 Gbps', '320 MHz channels, multi-link operation (MLO).']
                    ]
                },
                {
                    title: 'Twisted-pair copper (max 100 m channel unless noted)',
                    columns: ['Category', 'Max speed', 'Max distance at that speed', 'Note'],
                    rows: [
                        ['Cat 5', '100 Mbps', '100 m', '100BASE-TX. Obsolete.'],
                        ['Cat 5e', '1 Gbps', '100 m', '1000BASE-T uses all 4 pairs.'],
                        ['Cat 6', '10 Gbps', '55 m (1 Gbps to 100 m)', 'Common exam trap: 10G only to ~55 m.'],
                        ['Cat 6a', '10 Gbps', '100 m', 'Full-distance 10GBASE-T.'],
                        ['Cat 7', '10 Gbps', '100 m', 'Fully shielded (S/FTP); ISO class F, not a TIA standard.'],
                        ['Cat 8', '25/40 Gbps', '30 m', 'Data-center short runs (switch to server).'],
                        ['Plenum (CMP)', '—', '—', 'Fire-rated jacket required in air-handling spaces.']
                    ]
                },
                {
                    title: 'Fiber, connectors & transceivers',
                    columns: ['Item', 'Detail', 'Distance / use', 'Note'],
                    rows: [
                        ['Multimode (MMF)', '50 or 62.5 µm core; LED/VCSEL 850/1300 nm', 'Short: hundreds of meters (e.g. 10GBASE-SR ~300–400 m on OM3/OM4)', 'Cheaper optics; inside buildings and data centers.'],
                        ['Single-mode (SMF)', '9 µm core; laser 1310/1550 nm', 'Long: kilometers (10GBASE-LR 10 km, ER 40 km)', 'Campus and WAN links.'],
                        ['LC', 'Small form factor, push-pull latch', 'Most common on SFP/SFP+', '"Little connector".'],
                        ['SC', 'Square, push-pull', 'Patch panels, older gear', '"Square/standard connector".'],
                        ['ST', 'Round bayonet twist-lock', 'Legacy multimode', '"Stick and twist".'],
                        ['MPO/MTP', 'Multi-fiber (12 or 24 fibers in one ferrule)', '40/100G parallel optics', 'High-density data center trunks.'],
                        ['SFP / SFP+', '1 Gbps / 10 Gbps', 'Hot-swappable transceiver', 'QSFP+ = 40G, QSFP28 = 100G.']
                    ]
                }
            ]
        },
        {
            id: 'aws', title: 'AWS Limits & Storage', icon: '☁️', exams: 'AWS SAA-C03',
            groups: [
                {
                    title: 'Hard limits the exam tests',
                    columns: ['Service', 'Limit', 'Exam note'],
                    rows: [
                        ['Lambda timeout', '15 minutes (900 s)', 'Longer jobs → ECS/Fargate, Batch, or Step Functions.'],
                        ['Lambda memory', '128 MB – 10,240 MB (10 GB)', 'CPU scales with memory. /tmp ephemeral storage up to 10 GB.'],
                        ['Lambda concurrency', '1,000 per Region (default, raisable)', 'Reserved/provisioned concurrency for guarantees and cold starts.'],
                        ['SQS retention', '1 minute – 14 days (default 4 days)', 'Messages older than retention are deleted.'],
                        ['SQS visibility timeout', '0 s – 12 hours (default 30 s)', 'Set longer than processing time or messages are processed twice.'],
                        ['SQS long polling', 'Up to 20 s wait', 'Fewer empty receives = lower cost.'],
                        ['SQS delay queue', 'Up to 15 minutes', 'Postpones delivery of new messages.'],
                        ['SQS FIFO throughput', '300 msg/s (3,000 with batching)', 'Exactly-once, ordered. High-throughput mode raises it.'],
                        ['S3 object size', '5 TB max; single PUT 5 GB', 'Use multipart upload above ~100 MB (required above 5 GB).'],
                        ['DynamoDB item size', '400 KB', 'Bigger payloads → S3, store the key in DynamoDB.'],
                        ['VPC CIDR', '/16 (largest) to /28 (smallest)', '5 IPs reserved in every subnet (first 4 + last).'],
                        ['Step Functions', 'Standard up to 1 year; Express up to 5 minutes', 'Express for high-volume, short event processing.'],
                        ['API Gateway', '29 s integration timeout (default)', 'Long work → async (SQS / Step Functions).'],
                        ['Kinesis Data Streams', 'Retention 24 h default, up to 365 days', 'Replayable stream, unlike SQS.']
                    ]
                },
                {
                    title: 'S3 storage classes',
                    columns: ['Class', 'Access', 'Min storage duration', 'Retrieval'],
                    rows: [
                        ['S3 Standard', 'Frequent; ≥3 AZs', 'None', 'Milliseconds'],
                        ['S3 Intelligent-Tiering', 'Unknown/changing patterns', 'None (monitoring fee per object)', 'Milliseconds (optional archive tiers are slower); no retrieval fees'],
                        ['S3 Standard-IA', 'Infrequent; ≥3 AZs', '30 days (128 KB min billable)', 'Milliseconds + per-GB retrieval fee'],
                        ['S3 One Zone-IA', 'Infrequent, re-creatable data; 1 AZ', '30 days', 'Milliseconds + retrieval fee; lost if the AZ is lost'],
                        ['Glacier Instant Retrieval', 'Archive accessed ~quarterly', '90 days', 'Milliseconds'],
                        ['Glacier Flexible Retrieval', 'Archive', '90 days', 'Expedited 1–5 min · Standard 3–5 h · Bulk 5–12 h'],
                        ['Glacier Deep Archive', 'Long-term compliance', '180 days', 'Standard within 12 h · Bulk within 48 h']
                    ]
                },
                {
                    title: 'EBS volume types',
                    columns: ['Type', 'Media', 'Performance', 'Use'],
                    rows: [
                        ['gp3', 'SSD', 'Baseline 3,000 IOPS + 125 MiB/s at any size; IOPS and throughput scale independently', 'Default general purpose; boot volumes'],
                        ['gp2', 'SSD', '3 IOPS per GiB (burst to 3,000)', 'Older general purpose; migrate to gp3'],
                        ['io2 Block Express', 'SSD', 'Up to 256,000 IOPS, sub-ms latency, 99.999% durability; Multi-Attach', 'Mission-critical databases'],
                        ['st1', 'HDD', 'Throughput-optimized, big sequential I/O', 'Big data, logs, ETL. Cannot be a boot volume'],
                        ['sc1', 'HDD', 'Lowest cost, cold sequential data', 'Infrequent access. Cannot be a boot volume'],
                        ['Instance store', 'Local NVMe/SSD', 'Very high IOPS, ephemeral', 'Scratch/cache: data lost on stop or terminate']
                    ]
                }
            ]
        },
        {
            id: 'process', title: 'Ordered Processes', icon: '🧭', exams: 'A+ · Network+ · Security+ · PSM I',
            lists: [
                { title: 'CompTIA troubleshooting methodology (A+, 6 steps)', steps: ['Identify the problem (question users, identify changes, back up data first)', 'Establish a theory of probable cause (question the obvious)', 'Test the theory to determine the cause (if not confirmed, re-establish or escalate)', 'Establish a plan of action and implement the solution', 'Verify full system functionality and implement preventive measures', 'Document findings, actions and outcomes'] },
                { title: 'Network+ troubleshooting methodology (N10-009, 7 steps)', note: 'Same flow as A+, but "plan of action" and "implement the solution or escalate" are separate steps.', steps: ['Identify the problem', 'Establish a theory of probable cause', 'Test the theory to determine the cause', 'Establish a plan of action to resolve the problem and identify potential effects', 'Implement the solution or escalate as necessary', 'Verify full system functionality and implement preventive measures if applicable', 'Document findings, actions, outcomes and lessons learned'] },
                { title: 'Malware removal (A+ Core 2, 7 steps)', steps: ['Investigate and verify malware symptoms', 'Quarantine the infected system (disconnect from the network)', 'Disable System Restore in Windows', 'Remediate: update anti-malware, scan and remove (Safe Mode / preinstallation environment)', 'Schedule scans and run updates', 'Enable System Restore and create a restore point', 'Educate the end user'] },
                { title: 'Laser printer imaging process (A+ Core 1, 7 steps)', steps: ['Processing (raster image built in memory)', 'Charging (drum given a uniform negative charge)', 'Exposing (laser writes the image)', 'Developing (toner sticks to the exposed areas)', 'Transferring (toner moves to the paper)', 'Fusing (heat and pressure bond it)', 'Cleaning (drum wiped and discharged)'] },
                { title: 'Incident response: Security+ SY0-701', steps: ['Preparation', 'Detection', 'Analysis', 'Containment', 'Eradication', 'Recovery', 'Lessons learned'] },
                { title: 'Incident response: SANS PICERL', note: 'Older Security+ (SY0-601) used this wording, with "Identification".', steps: ['Preparation', 'Identification', 'Containment', 'Eradication', 'Recovery', 'Lessons learned'] },
                { title: 'Incident response: NIST SP 800-61', steps: ['Preparation', 'Detection & Analysis', 'Containment, Eradication & Recovery', 'Post-Incident Activity'] }
            ],
            table: {
                title: 'Scrum events (one-month Sprint; shorter Sprints usually shorter events)',
                columns: ['Event', 'Max timebox', 'Who', 'In → Out'],
                rows: [
                    ['Sprint', '1 month or less', 'Scrum Team', 'Container for all other events; next starts immediately after the last.'],
                    ['Sprint Planning', '8 hours', 'Whole Scrum Team (may invite others)', 'Product Backlog, Product Goal → Sprint Goal + Sprint Backlog (why, what, how).'],
                    ['Daily Scrum', '15 minutes', 'Developers (PO/SM only if working on Sprint Backlog items)', 'Progress toward Sprint Goal → adapted Sprint Backlog / plan for the day.'],
                    ['Sprint Review', '4 hours', 'Scrum Team + key stakeholders', 'Increment, progress toward Product Goal → revised Product Backlog.'],
                    ['Sprint Retrospective', '3 hours', 'Scrum Team', 'How the Sprint went (people, process, tools, DoD) → improvements, may go in next Sprint Backlog.'],
                    ['Backlog refinement', 'No timebox (not an event)', 'PO + Developers, ongoing', 'Breaks down and sizes items so the top of the backlog is ready.']
                ]
            }
        }
    ];

    let drawer = null, active = 'ports', lastFocus = null;

    function tableHtml(columns, rows, q) {
        const match = r => !q || r.join(' ').toLowerCase().includes(q);
        const shown = rows.filter(match);
        if (!shown.length) return '';
        return `<div class="cram-table-wrap"><table class="cram-table"><thead><tr>${columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
            <tbody>${shown.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="cram-key"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }

    function sheetHtml(sheet, q) {
        let out = '', hits = 0;
        const add = (title, html) => { if (html) { hits++; out += (title ? `<h4 class="cram-h">${esc(title)}</h4>` : '') + html; } };
        if (sheet.columns) add('', tableHtml(sheet.columns, sheet.rows, q));
        (sheet.groups || []).forEach(g => add(g.title, tableHtml(g.columns, g.rows, q)));
        (sheet.lists || []).forEach(l => {
            const hit = !q || (l.title + ' ' + l.steps.join(' ')).toLowerCase().includes(q);
            if (hit) add(l.title, `${l.note ? `<p class="cram-note">${esc(l.note)}</p>` : ''}<ol class="cram-steps">${l.steps.map(s => `<li${q && s.toLowerCase().includes(q) ? ' class="hit"' : ''}>${esc(s)}</li>`).join('')}</ol>`);
        });
        if (sheet.table) add(sheet.table.title, tableHtml(sheet.table.columns, sheet.table.rows, q));
        const note = sheet.note ? `<p class="cram-note">${sheet.note}</p>` : '';
        return hits ? note + out : `<p class="cram-empty">Nothing on this sheet matches “${esc(q)}”.</p>`;
    }

    function render() {
        const q = drawer.querySelector('.cram-search').value.trim().toLowerCase();
        drawer.querySelectorAll('.cram-tab').forEach(t => {
            const on = t.dataset.sheet === active;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
        });
        const sheet = SHEETS.find(s => s.id === active);
        // While searching, also say which other sheets have matches, so a search never dead-ends on one tab.
        let elsewhere = '';
        if (q) {
            const others = SHEETS.filter(s => s.id !== active && !/cram-empty/.test(sheetHtml(s, q)));
            if (others.length) elsewhere = `<p class="cram-elsewhere">Also on: ${others.map(s => `<button type="button" class="cram-jump" data-sheet="${s.id}">${s.icon} ${esc(s.title)}</button>`).join(' ')}</p>`;
        }
        drawer.querySelector('.cram-body').innerHTML = `<div class="cram-exams">${esc(sheet.exams)}</div>${elsewhere}${sheetHtml(sheet, q)}`;
    }

    function build() {
        drawer = document.createElement('aside');
        drawer.className = 'cram-drawer';
        drawer.hidden = true;
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-label', 'Cram sheets');
        drawer.innerHTML = `
            <div class="cram-top">
                <h2>⚡ Cram Sheets</h2>
                <button type="button" class="cram-x" aria-label="Close cram sheets">&#10005;</button>
            </div>
            <input type="search" class="cram-search" placeholder="Search: 3389, Glacier, /27, Fusing…" aria-label="Search cram sheets" autocomplete="off">
            <div class="cram-tabs" role="tablist">${SHEETS.map(s => `<button type="button" role="tab" class="cram-tab" data-sheet="${s.id}">${s.icon} ${esc(s.title)}</button>`).join('')}</div>
            <div class="cram-body" role="tabpanel"></div>`;
        document.body.appendChild(drawer);
        drawer.querySelector('.cram-x').addEventListener('click', close);
        drawer.querySelector('.cram-search').addEventListener('input', render);
        drawer.addEventListener('click', e => {
            const t = e.target.closest('[data-sheet]');
            if (t) { active = t.dataset.sheet; render(); }
        });
        drawer.addEventListener('keydown', e => {
            if (e.key === 'Escape') { e.preventDefault(); close(); }
            if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && e.target.classList.contains('cram-tab')) {
                const i = SHEETS.findIndex(s => s.id === active);
                active = SHEETS[(i + (e.key === 'ArrowRight' ? 1 : SHEETS.length - 1)) % SHEETS.length].id;
                render();
                drawer.querySelector(`.cram-tab[data-sheet="${active}"]`).focus();
            }
        });
    }

    function open(sheetId) {
        if (!drawer) build();
        if (sheetId && SHEETS.some(s => s.id === sheetId)) active = sheetId;
        lastFocus = document.activeElement;
        drawer.hidden = false;
        document.documentElement.classList.add('cram-on');
        render();
        drawer.querySelector('.cram-search').focus();
        const btn = document.querySelector('.cram-fab');
        if (btn) btn.setAttribute('aria-expanded', 'true');
    }
    function close() {
        drawer.hidden = true;
        document.documentElement.classList.remove('cram-on');
        const btn = document.querySelector('.cram-fab');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function toggle() { if (drawer && !drawer.hidden) close(); else open(); }

    function init() {
        if (document.querySelector('.cram-fab')) return;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cram-fab';
        b.setAttribute('aria-expanded', 'false');
        b.innerHTML = '⚡ <span>Cram Sheets</span>';
        b.addEventListener('click', toggle);
        document.body.appendChild(b);
        if (location.hash === '#cram') open();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
    return { open, close, toggle, SHEETS, cidrRows };
})();
