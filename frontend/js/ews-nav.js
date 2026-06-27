/**
 * EWS Site ù unified header & footer for all pages.
 * Include with empty <header></header> and <footer></footer> in HTML.
 */
(function () {
    'use strict';

    var NAV_ITEMS = [
        { id: 'home',        label: 'Home' },
        { id: 'services',    label: 'Services' },
        { id: 'how-we-work', label: 'How We Work' },
        { id: 'about',       label: 'About' },
        { id: 'security',    label: 'Security' },
        { id: 'contact',     label: 'Contact' }
    ];

    function getPaths() {
        var inPages = /\/pages\//.test(window.location.pathname);
        return {
            home: inPages ? '../index.html' : 'index.html',
            page: function (file) { return inPages ? file : 'pages/' + file; },
            portal: inPages ? '../portal/index.html' : 'portal/index.html',
            assets: inPages ? '../assets' : 'assets'
        };
    }

    function activeId() {
        var path = window.location.pathname;
        if (/\/pages\//.test(path)) {
            var file = path.split('/').pop().replace('.html', '');
            if (file === 'index') return 'home';
            if (file === 'assessment') return 'contact';
            if (file === 'dashboard') return 'services';
            if (file === 'privacy' || file === 'terms' || file === 'disclaimer' || file === 'cookies') return '';
            return file;
        }
        return 'home';
    }

    function navHref(id, paths) {
        var map = {
            'home':        paths.home,
            'services':    paths.page('services.html'),
            'how-we-work': paths.page('how-we-work.html'),
            'about':       paths.page('about.html'),
            'security':    paths.page('security.html'),
            'contact':     paths.page('contact.html')
        };
        return map[id] || paths.home;
    }

    function renderHeader(paths, current) {
        var links = NAV_ITEMS.map(function (item) {
            var cls = item.id === current ? 'ews-nav-link active' : 'ews-nav-link';
            return '<a href="' + navHref(item.id, paths) + '" class="' + cls + '">' + item.label + '</a>';
        }).join('');

        return '<div class="ews-header-inner">' +
            '<a href="' + paths.home + '" class="ews-brand">' +
                '<img src="' + paths.assets + '/logo/ews-logo-primary.png" alt="Elite Web Services" class="ews-brand-logo" width="44" height="44">' +
                '<div class="ews-brand-text">' +
                    '<span class="ews-brand-name">Elite Web Services</span>' +
                    '<span class="ews-brand-tagline">AWS Cloud Solutions</span>' +
                '</div>' +
            '</a>' +
            '<button class="ews-nav-toggle" aria-label="Toggle menu" aria-expanded="false">' +
                '<span></span><span></span><span></span>' +
            '</button>' +
            '<nav class="ews-nav" aria-label="Main navigation">' + links + '</nav>' +
            '<a href="' + paths.portal + '" class="ews-nav-cta">Portal Demo</a>' +
        '</div>';
    }

    function renderFooter(paths) {
        return '<div class="ews-footer-inner">' +
            '<p class="ews-footer-copy">&copy; 2026 Elite Web Services LLC. All rights reserved. AWS Cloud Strategy | Innovation | Transformation.</p>' +
            '<p class="ews-footer-meta">HQ: Houston, TX &nbsp;|&nbsp; <a href="mailto:elitewebservicesllc@gmail.com">elitewebservicesllc@gmail.com</a></p>' +
            '<div class="ews-footer-links">' +
                '<a href="' + paths.page('privacy.html') + '">Privacy Policy</a>' +
                '<a href="' + paths.page('terms.html') + '">Terms of Service</a>' +
                '<a href="' + paths.page('disclaimer.html') + '">Disclaimer</a>' +
                '<a href="' + paths.page('cookies.html') + '">Cookie Notice</a>' +
                '<a href="' + paths.page('security.html') + '">Security</a>' +
            '</div>' +
        '</div>';
    }

    function initMobileNav(header) {
        var toggle = header.querySelector('.ews-nav-toggle');
        var nav = header.querySelector('.ews-nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function init() {
        var paths = getPaths();
        var current = activeId();

        var header = document.querySelector('header');
        if (header) {
            header.className = 'ews-site-header';
            header.innerHTML = renderHeader(paths, current);
            initMobileNav(header);
        }

        var footer = document.querySelector('footer');
        if (footer) {
            footer.className = 'ews-site-footer';
            footer.innerHTML = renderFooter(paths);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.EWSNav = { init: init, getPaths: getPaths };
})();
