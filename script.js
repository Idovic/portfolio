// Navigation Mobile
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });

        // Fermer le menu mobile lors du clic sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }

    // Animation des barres de compétences
    animateSkillBars();

    // Validation du formulaire de contact
    initContactForm();

    // Animation des cartes projets
    initProjectCards();

    // Animation au scroll
    initScrollAnimations();
});

// Animation des barres de compétences
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillLevel = skillBar.getAttribute('data-skill');
                skillBar.style.width = skillLevel + '%';
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Validation et soumission du formulaire de contact
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset des erreurs précédentes
        clearErrors();
        
        // Validation
        let isValid = true;
        
        // Validation du nom
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            showError('nameError', 'Le nom doit contenir au moins 2 caractères');
            isValid = false;
        }
        
        // Validation de l'email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('emailError', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
        
        // Validation du téléphone (optionnel mais si rempli, doit être valide)
        const phone = document.getElementById('phone').value.trim();
        if (phone && !/^[\d\s\+\-\(\)\.]{10,}$/.test(phone)) {
            showError('phoneError', 'Veuillez entrer un numéro de téléphone valide');
            isValid = false;
        }
        
        // Validation du sujet
        const subject = document.getElementById('subject').value;
        if (!subject) {
            showError('subjectError', 'Veuillez sélectionner un sujet');
            isValid = false;
        }
        
        // Validation du message
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) {
            showError('messageError', 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        }
        
        // Si tout est valide, simuler l'envoi
        if (isValid) {
            submitForm(form);
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Animation de chargement
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simuler l'envoi avec un délai
    setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Reset du formulaire après 5 secondes
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 5000);
    }, 2000);
}

// Animation des cartes projets
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Effet de clic
        card.addEventListener('click', function() {
            const projectType = this.getAttribute('data-project');
            showProjectDetails(projectType);
        });
    });
}

function showProjectDetails(projectType) {
    const projectDetails = {
        'ecommerce': {
            title: 'Plateforme E-Commerce',
            description: 'Application complète avec système de panier, paiement sécurisé, gestion des stocks et interface d\'administration.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
            features: ['Authentification utilisateur', 'Panier persistant', 'Paiement en ligne', 'Gestion des commandes', 'Interface admin']
        },
        'dashboard': {
            title: 'Dashboard Analytics',
            description: 'Interface d\'administration moderne avec graphiques interactifs et statistiques en temps réel.',
            technologies: ['Vue.js', 'Chart.js', 'Express', 'Socket.io', 'PostgreSQL'],
            features: ['Graphiques temps réel', 'Tableaux de bord personnalisables', 'Exportation de données', 'Notifications push']
        },
        'mobile': {
            title: 'Application Mobile',
            description: 'App de réservation avec géolocalisation, notifications push et synchronisation offline.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Google Maps API'],
            features: ['Géolocalisation', 'Mode offline', 'Notifications push', 'Synchronisation cloud']
        },
        'blog': {
            title: 'CMS Blog',
            description: 'Système de gestion de contenu avec éditeur WYSIWYG et gestion multi-utilisateurs.',
            technologies: ['PHP', 'MySQL', 'jQuery', 'TinyMCE', 'Bootstrap'],
            features: ['Éditeur WYSIWYG', 'Gestion des utilisateurs', 'Système de commentaires', 'SEO optimisé']
        }
    };
    
    const project = projectDetails[projectType];
    if (project) {
        alert(`${project.title}\n\n${project.description}\n\nTechnologies: ${project.technologies.join(', ')}\n\nFonctionnalités:\n${project.features.map(f => '• ' + f).join('\n')}`);
    }
}

// Animations au scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.hobby-card, .project-card, .stat, .skill-category');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fonction utilitaire pour déboguer
function log(message) {
    console.log(`Portfolio Debug: ${message}`);
}

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    log(`Page chargée en ${Math.round(loadTime)}ms`);
});