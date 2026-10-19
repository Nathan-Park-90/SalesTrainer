/**
 * Mammoth Academy — inline architecture diagrams (diagrams.js; used by the Library lesson renderer)
 *
 * Hand-drawn SVG, no images, so they work offline and inherit the theme: colors come from the .dg-* classes in
 * style.css (dark by default, Mammoth mode restyles them like everything else). A topic opts in with
 * `diagrams: ['aws-vpc', ...]` in its course pack; app.renderLessonContent() calls Diagrams.render(id).
 */
const Diagrams = (function () {
    'use strict';

    // Small SVG helpers so each diagram reads like a layout, not a wall of markup.
    const box = (x, y, w, h, cls, rx = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/>`;
    const text = (x, y, s, cls = 'dg-t', anchor = 'middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${s}</text>`;
    const node = (x, y, w, h, title, sub, cls = 'dg-node') =>
        box(x, y, w, h, cls) + text(x + w / 2, y + (sub ? h / 2 - 3 : h / 2 + 5), title, 'dg-t dg-b') + (sub ? text(x + w / 2, y + h / 2 + 15, sub, 'dg-t dg-s') : '');
    const arrow = (x1, y1, x2, y2, cls = 'dg-arrow') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" marker-end="url(#dg-head)"/>`;
    const path = (d, cls = 'dg-arrow') => `<path d="${d}" class="${cls}" fill="none" marker-end="url(#dg-head)"/>`;
    const defs = `<defs><marker id="dg-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-headfill"/></marker></defs>`;

    function svg(id, w, h, title, desc, body) {
        return `<svg class="dg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="dg-${id}-t dg-${id}-d" preserveAspectRatio="xMidYMid meet">
            <title id="dg-${id}-t">${title}</title><desc id="dg-${id}-d">${desc}</desc>${defs}${body}</svg>`;
    }

    const LIB = {
        'aws-vpc': {
            caption: 'AWS VPC: public subnet faces the internet; private subnet reaches out only through NAT, and reaches S3/DynamoDB privately through a gateway endpoint.',
            svg: () => svg('vpc', 820, 556, 'AWS VPC architecture',
                'Internet traffic enters through the Internet Gateway to an Application Load Balancer in the public subnet, which forwards to EC2 in the private subnet; EC2 talks to RDS in the private subnet, reaches the internet outbound only through a NAT Gateway in the public subnet, and reaches S3 and DynamoDB through a Gateway VPC endpoint without leaving AWS.',
                node(330, 14, 160, 44, '🌐 Internet', '', 'dg-node dg-ext') +
                box(20, 80, 780, 430, 'dg-region', 16) + text(40, 104, 'AWS Region', 'dg-t dg-label', 'start') +
                box(40, 116, 560, 380, 'dg-vpc', 14) + text(56, 140, 'VPC 10.0.0.0/16', 'dg-t dg-label', 'start') +
                node(340, 96, 140, 40, 'Internet Gateway', '', 'dg-node dg-gw') +
                // public subnet
                box(60, 156, 520, 120, 'dg-public', 12) + text(76, 178, 'Public subnet 10.0.1.0/24', 'dg-t dg-label dg-pubt', 'start') +
                text(564, 178, 'route 0.0.0.0/0 → IGW', 'dg-t dg-s', 'end') +
                node(110, 196, 170, 60, 'Application LB', 'internet-facing') +
                node(360, 196, 170, 60, 'NAT Gateway', 'outbound only') +
                // private subnet
                box(60, 296, 520, 186, 'dg-private', 12) + text(76, 318, 'Private subnet 10.0.2.0/24', 'dg-t dg-label dg-privt', 'start') +
                text(564, 318, 'route 0.0.0.0/0 → NAT · pl-S3/DDB → vpce', 'dg-t dg-s', 'end') +
                node(110, 340, 170, 60, 'EC2 (app tier)', 'Auto Scaling group') +
                node(110, 410, 170, 56, 'RDS', 'no public IP') +
                node(360, 370, 170, 60, 'Gateway endpoint', 'vpce-… (free)', 'dg-node dg-gw') +
                // regional services outside the VPC
                node(626, 300, 156, 56, 'Amazon S3', 'regional service', 'dg-node dg-ext') +
                node(626, 390, 156, 56, 'DynamoDB', 'regional service', 'dg-node dg-ext') +
                // traffic
                arrow(410, 58, 410, 96) +
                path('M380,136 C300,150 220,160 200,196') +
                arrow(195, 256, 195, 340) +
                arrow(195, 400, 195, 410) +
                path('M280,360 C330,330 400,300 430,256', 'dg-arrow dg-out') +
                path('M460,196 C460,170 440,150 430,136', 'dg-arrow dg-out') +
                arrow(280, 380, 360, 395, 'dg-arrow dg-priv') +
                path('M530,390 C580,370 600,340 626,330', 'dg-arrow dg-priv') +
                path('M530,410 C580,415 600,418 626,418', 'dg-arrow dg-priv') +
                // legend, below the Region box, with real line samples
                `<line x1="70" y1="534" x2="104" y2="534" class="dg-arrow"/>` + text(112, 538, 'inbound web', 'dg-t dg-s', 'start') +
                `<line x1="250" y1="534" x2="284" y2="534" class="dg-arrow dg-out"/>` + text(292, 538, 'outbound only, via NAT', 'dg-t dg-s', 'start') +
                `<line x1="480" y1="534" x2="514" y2="534" class="dg-arrow dg-priv"/>` + text(522, 538, 'private to S3/DynamoDB (no internet)', 'dg-t dg-s', 'start')
            )
        },

        'aws-dr': {
            caption: 'The DR spectrum: moving right buys a smaller RTO/RPO with more always-on infrastructure (cost).',
            svg: () => {
                const xs = [140, 330, 520, 710], names = ['Backup & Restore', 'Pilot Light', 'Warm Standby', 'Multi-Site Active/Active'];
                const what = ['Backups only; rebuild on failover', 'Core data replicated; compute off', 'Scaled-down full stack running', 'Full capacity live in 2+ Regions'];
                const rto = ['Hours', 'Tens of minutes', 'Minutes', '≈ Zero'];
                const rpo = ['Since last backup', 'Minutes', 'Seconds–minutes', '≈ Zero'];
                const yRto = [120, 175, 230, 285], yCost = [285, 230, 175, 120];
                let b = '';
                b += text(30, 34, 'Recovery time / data loss ↓', 'dg-t dg-label dg-good', 'start') + text(800, 34, 'Cost ↑', 'dg-t dg-label dg-warn', 'end');
                b += `<line x1="70" y1="310" x2="790" y2="310" class="dg-axis"/>`;
                b += `<polyline points="${xs.map((x, i) => `${x},${yRto[i]}`).join(' ')}" class="dg-line dg-good-line"/>`;
                b += `<polyline points="${xs.map((x, i) => `${x},${yCost[i]}`).join(' ')}" class="dg-line dg-warn-line"/>`;
                xs.forEach((x, i) => {
                    b += `<circle cx="${x}" cy="${yRto[i]}" r="6" class="dg-dot dg-good-dot"/><circle cx="${x}" cy="${yCost[i]}" r="6" class="dg-dot dg-warn-dot"/>`;
                    // last point: label to the right of the dot so it doesn't sit on the line coming into it
                    b += i === 3 ? text(x + 12, yRto[i] + 4, 'RTO ' + rto[i], 'dg-t dg-s dg-good', 'start') : text(x + 10, yRto[i] - 10, 'RTO ' + rto[i], 'dg-t dg-s dg-good', 'start');
                    b += node(x - 88, 326, 176, 50, names[i], '', 'dg-node' + (i === 3 ? ' dg-gw' : ''));
                    b += text(x, 396, what[i], 'dg-t dg-s');
                    b += text(x, 414, 'RPO: ' + rpo[i], 'dg-t dg-s');
                });
                b += arrow(110, 444, 760, 444, 'dg-arrow');
                b += text(435, 466, 'cheaper, slower recovery  →  costlier, faster recovery', 'dg-t dg-s');
                return svg('dr', 820, 480, 'AWS disaster recovery spectrum',
                    'Four strategies from left to right: Backup and Restore with RTO in hours, Pilot Light with tens of minutes, Warm Standby with minutes, Multi-Site Active/Active with near-zero RTO and RPO. Cost rises from left to right while recovery time and data loss fall.', b);
            }
        },

        'osi': {
            caption: 'Walk the stack bottom-up when troubleshooting. Mnemonic (1→7): Please Do Not Throw Sausage Pizza Away.',
            svg: () => {
                const L = [
                    ['7', 'Application', 'Data', 'Host, WAF, proxy', 'HTTP/S, DNS, SMTP, SSH, FTP, SNMP'],
                    ['6', 'Presentation', 'Data', '—', 'Encoding, encryption (TLS), JPEG, ASCII'],
                    ['5', 'Session', 'Data', '—', 'Session setup/teardown (RPC, NetBIOS)'],
                    ['4', 'Transport', 'Segment / Datagram', 'Stateful firewall, L4 LB', 'TCP, UDP, port numbers'],
                    ['3', 'Network', 'Packet', 'Router, L3 switch', 'IPv4/IPv6, ICMP, OSPF, BGP, IPsec'],
                    ['2', 'Data Link', 'Frame', 'Switch, bridge, NIC, WAP', 'Ethernet, 802.11, 802.1Q, STP, ARP'],
                    ['1', 'Physical', 'Bits', 'Hub, repeater, cabling', 'Copper, fiber, radio; 1000BASE-T']
                ];
                const cols = [[20, 70, '#'], [90, 150, 'Layer'], [240, 170, 'PDU'], [410, 190, 'Hardware'], [600, 200, 'Protocols / examples']];
                let b = cols.map(([x, w, h]) => text(x + 10, 30, h, 'dg-t dg-label', 'start')).join('');
                L.forEach((r, i) => {
                    const y = 44 + i * 50;
                    const band = i < 3 ? 'dg-upper' : i === 3 ? 'dg-mid' : 'dg-lower';
                    b += box(20, y, 780, 42, 'dg-row ' + band, 8);
                    b += text(55, y + 27, r[0], 'dg-t dg-big');
                    b += text(100, y + 26, r[1], 'dg-t dg-b', 'start');
                    b += text(250, y + 26, r[2], 'dg-t dg-pdu', 'start');
                    b += text(420, y + 26, r[3], 'dg-t dg-s', 'start');
                    b += text(610, y + 26, r[4], 'dg-t dg-s', 'start');
                });
                b += text(410, 410, 'Sender encapsulates downward (data → segment → packet → frame → bits); receiver de-encapsulates upward.', 'dg-t dg-s');
                return svg('osi', 820, 424, 'OSI 7-layer model',
                    'Layers 7 to 1 with their protocol data unit, typical hardware and example protocols: Application, Presentation and Session carry data; Transport carries segments or datagrams; Network carries packets on routers; Data Link carries frames on switches; Physical carries bits on cabling and hubs.', b);
            }
        },

        'zero-trust': {
            caption: 'Zero Trust (NIST SP 800-207): nothing is trusted for being "inside". The control plane decides, the data plane enforces.',
            svg: () => svg('zt', 820, 470, 'Zero Trust policy engine',
                'A subject (user and device) requests a resource. The Policy Enforcement Point in the data plane asks the Policy Decision Point in the control plane, made of the Policy Engine and Policy Administrator, which weighs identity, device posture, threat intelligence, activity logs and policy. The Policy Administrator tells the PEP to allow or deny, and only then is a session opened to the resource.',
                box(20, 20, 780, 190, 'dg-ctrl', 14) + text(40, 44, 'CONTROL PLANE: decides', 'dg-t dg-label dg-warn', 'start') +
                box(250, 60, 320, 130, 'dg-pdp', 12) + text(410, 84, 'Policy Decision Point (PDP)', 'dg-t dg-b') +
                node(270, 96, 135, 76, 'Policy Engine', 'grant / deny / revoke') +
                node(415, 96, 140, 76, 'Policy Administrator', 'sets up / tears down') +
                node(36, 62, 190, 34, 'Identity (IdP, MFA)', '', 'dg-node dg-src') +
                node(36, 102, 190, 34, 'Device posture (MDM/EDR)', '', 'dg-node dg-src') +
                node(36, 142, 190, 34, 'Access policy', '', 'dg-node dg-src') +
                node(594, 62, 190, 34, 'Threat intelligence', '', 'dg-node dg-src') +
                node(594, 102, 190, 34, 'SIEM / activity logs', '', 'dg-node dg-src') +
                node(594, 142, 190, 34, 'Data classification', '', 'dg-node dg-src') +
                arrow(226, 79, 270, 112) + arrow(226, 119, 270, 128) + arrow(226, 159, 270, 150) +
                arrow(594, 79, 555, 112) + arrow(594, 119, 555, 128) + arrow(594, 159, 555, 150) +
                box(20, 236, 780, 214, 'dg-data', 14) + text(40, 260, 'DATA PLANE: enforces', 'dg-t dg-label dg-good', 'start') +
                node(40, 320, 170, 70, '👤 Subject', 'user + device') +
                node(320, 310, 180, 90, 'Policy Enforcement', 'Point (PEP)', 'dg-node dg-gw') +
                box(590, 290, 200, 130, 'dg-trustzone', 12) + text(690, 312, 'Implicit trust zone', 'dg-t dg-s') +
                node(610, 324, 160, 70, '🗄️ Resource', 'app / data') +
                arrow(210, 355, 320, 355) + text(265, 345, '1 request', 'dg-t dg-s') +
                path('M390,310 C380,260 360,230 340,190') + text(400, 262, '2 ask', 'dg-t dg-s', 'start') +
                path('M480,190 C470,230 455,260 445,310', 'dg-arrow dg-good-arrow') + text(500, 262, '3 allow + session', 'dg-t dg-s dg-good', 'start') +
                arrow(500, 355, 610, 355, 'dg-arrow dg-good-arrow') + text(555, 345, '4 access', 'dg-t dg-s dg-good') +
                text(410, 440, 'Every request is re-evaluated (continuous verification, least privilege, assume breach).', 'dg-t dg-s')
            )
        }
    };

    function render(id) {
        const d = LIB[id];
        if (!d) return '';
        return `<figure class="lesson-diagram" data-diagram="${id}"><button type="button" class="dg-expand" aria-label="Expand diagram" onclick="Diagrams.expand('${id}')">&#10530; Expand</button>${d.svg()}<figcaption>${d.caption}</figcaption></figure>`;
    }

    // The lesson column is narrow on desktop (TOC + takeaway panels), so labels get small: open a full-screen view.
    let box2 = null, last = null;
    function expand(id) {
        const d = LIB[id];
        if (!d) return;
        last = document.activeElement;
        if (!box2) {
            box2 = document.createElement('div');
            box2.className = 'dg-lightbox';
            box2.setAttribute('role', 'dialog');
            box2.setAttribute('aria-modal', 'true');
            box2.addEventListener('click', e => { if (e.target === box2 || e.target.closest('.dg-close')) collapse(); });
            box2.addEventListener('keydown', e => { if (e.key === 'Escape') collapse(); });
            document.body.appendChild(box2);
        }
        box2.setAttribute('aria-label', d.caption);
        box2.innerHTML = `<div class="dg-lightbox-inner"><button type="button" class="dg-close" aria-label="Close diagram">&#10005;</button>${d.svg()}<p>${d.caption}</p></div>`;
        box2.hidden = false;
        box2.querySelector('.dg-close').focus();
    }
    function collapse() { if (box2) box2.hidden = true; if (last && last.focus) last.focus(); }

    return { render, expand, collapse, ids: Object.keys(LIB) };
})();
