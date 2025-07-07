// Simple Transition System - Optimized Performance Version
// Replaces the heavy sand-transition.js with lightweight alternatives

window.simpleTransition = (function() {
    
    // Lightweight transition effects
    const transitions = {
        fade: function(targetUrl, duration = 800) {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #061c32, #0560a9);
                opacity: 0;
                z-index: 9999;
                transition: opacity ${duration}ms ease;
            `;
            
            document.body.appendChild(overlay);
            
            // Trigger fade in
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });
            
            // Navigate after fade
            setTimeout(() => {
                window.location.href = targetUrl;
            }, duration * 0.8);
        },
        
        slide: function(targetUrl, direction = 'left', duration = 600) {
            const currentPage = document.body;
            const overlay = document.createElement('div');
            
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                ${direction}: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #061c32, #0560a9);
                z-index: 9999;
                transition: ${direction} ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            document.body.appendChild(overlay);
            
            // Trigger slide
            requestAnimationFrame(() => {
                overlay.style[direction] = '0';
                currentPage.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;
                currentPage.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            });
            
            // Navigate after slide
            setTimeout(() => {
                window.location.href = targetUrl;
            }, duration * 0.9);
        },
        
        // Simplified door effect without heavy animations
        door: function(targetUrl, duration = 1000) {
            const leftDoor = document.createElement('div');
            const rightDoor = document.createElement('div');
            
            const doorStyle = `
                position: fixed;
                top: 0;
                width: 50%;
                height: 100%;
                background: linear-gradient(135deg, #061c32, #0560a9);
                z-index: 9999;
                transition: transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            leftDoor.style.cssText = doorStyle + 'left: 0; transform-origin: left;';
            rightDoor.style.cssText = doorStyle + 'right: 0; transform-origin: right;';
            
            document.body.appendChild(leftDoor);
            document.body.appendChild(rightDoor);
            
            // Trigger door opening
            requestAnimationFrame(() => {
                leftDoor.style.transform = 'translateX(-100%)';
                rightDoor.style.transform = 'translateX(100%)';
            });
            
            // Navigate after doors open
            setTimeout(() => {
                window.location.href = targetUrl;
            }, duration * 0.8);
        }
    };
    
    // Auto-detect best transition based on device capabilities
    function getBestTransition() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return 'fade';
        }
        
        // Check device performance
        const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                              navigator.deviceMemory <= 2 ||
                              /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isLowEndDevice) {
            return 'fade';
        }
        
        return 'door'; // Default to door for better devices
    }
    
    // Enhanced link interceptor with performance considerations
    function initTransitionLinks() {
        document.addEventListener('click', function(e) {
            let target = e.target;
            
            // Find parent link if clicked element is not a link
            while (target && target.tagName !== 'A') {
                target = target.parentElement;
            }
            
            if (target && target.href && !target.hasAttribute('data-no-transition')) {
                // Only apply transitions to internal links
                const url = new URL(target.href);
                const currentUrl = new URL(window.location.href);
                
                if (url.origin === currentUrl.origin) {
                    e.preventDefault();
                    
                    // Get transition type from data attribute or auto-detect
                    const transitionType = target.getAttribute('data-transition') || getBestTransition();
                    const duration = parseInt(target.getAttribute('data-duration')) || undefined;
                    
                    // Execute transition
                    if (transitions[transitionType]) {
                        transitions[transitionType](target.href, duration);
                    } else {
                        // Fallback to immediate navigation
                        window.location.href = target.href;
                    }
                }
            }
        });
    }
    
    // Performance monitoring
    function logPerformance() {
        if ('performance' in window && 'getEntriesByType' in performance) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                        console.log('Performance Metrics:', {
                            'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
                            'TCP Connect': navigation.connectEnd - navigation.connectStart,
                            'Request': navigation.responseStart - navigation.requestStart,
                            'Response': navigation.responseEnd - navigation.responseStart,
                            'DOM Processing': navigation.domContentLoadedEventStart - navigation.responseEnd,
                            'Total Load Time': navigation.loadEventEnd - navigation.navigationStart
                        });
                    }
                }, 0);
            });
        }
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalUrls = [
            'templates/companies/general.html',
            'assets/css/styles.css'
        ];
        
        criticalUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }
    
    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initTransitionLinks();
                preloadCriticalResources();
                logPerformance();
            });
        } else {
            initTransitionLinks();
            preloadCriticalResources();
            logPerformance();
        }
    }
    
    // Public API
    return {
        init: init,
        fade: transitions.fade,
        slide: transitions.slide,
        door: transitions.door,
        getBestTransition: getBestTransition
    };
})();

// Auto-initialize
simpleTransition.init();

// Performance tip: Use transform and opacity for animations
// These properties are optimized by the browser and don't trigger layout/paint

// Usage examples:
// <a href="/page" data-transition="fade">Fade transition</a>
// <a href="/page" data-transition="slide" data-duration="500">Fast slide</a>
// <a href="/page" data-no-transition>No transition</a>