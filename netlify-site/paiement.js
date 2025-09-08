// paiement.js - Configuration des services et prix
const SERVICES = {
    'formation-tiktok': {
        nom: 'Formation TikTok Complète',
        prix: 25000,
        devise: 'FCFA',
        description: 'Maîtrisez l\'algorithme TikTok, créez du contenu viral, développez votre audience et monétisez votre présence'
    },
    'formation-facebook': {
        nom: 'Formation Facebook Complète', 
        prix: 35000,
        devise: 'FCFA',
        description: 'Devenez expert en publicité Facebook. Apprenez à créer des campagnes rentables et à analyser vos performances'
    },
    'coach-sportif': {
        nom: 'Coach Sportif Personnel',
        prix: 10000,
        devise: 'FCFA', 
        description: 'Programmes d\'entraînement sur mesure et accompagnement nutritionnel pour atteindre vos objectifs fitness'
    },
    'accompagnement-scolaire': {
        nom: 'Accompagnement Scolaire',
        prix: 10000,
        devise: 'FCFA',
        description: 'Soutien personnalisé pour élèves'
    },
    'geolocalisation': {
        nom: 'Géolocalisation Google Maps',
        prix: 50000, 
        devise: 'FCFA',
        description: 'Augmentez votre visibilité locale'
    }
};

// Numéros de paiement
const NUMEROS_PAIEMENT = {
    mtn: { numero: '653 009 123', nom: 'ACADEMIE DIGITAL' },
    orange: { numero: '699 864 842', nom: 'ACADEMIE DIGITAL' }
};


// Variable globale pour le service sélectionné
let serviceSelectionne = null;

// Fonction pour afficher le modal de paiement
function afficherModalPaiement(serviceId) {
    serviceSelectionne = SERVICES[serviceId];
    
    if (!serviceSelectionne) {
        alert('Service non trouvé');
        return;
    }
    
    // Mettre à jour le modal
    document.getElementById('modal-titre').textContent = 'Paiement : ' + serviceSelectionne.nom;
    document.getElementById('modal-description').textContent = serviceSelectionne.description;
    document.getElementById('modal-prix').textContent = serviceSelectionne.prix.toLocaleString() + ' ' + serviceSelectionne.devise;
    document.getElementById('service-selectionne').textContent = serviceSelectionne.nom;
    
    // Mettre à jour les montants
    const montantElements = document.querySelectorAll('#montant-mtn, #montant-orange');
    montantElements.forEach(function(el) {
        el.textContent = serviceSelectionne.prix.toLocaleString() + ' ' + serviceSelectionne.devise;
    });
    
    // Afficher le modal
    document.getElementById('modal-paiement').style.display = 'block';
}

// Fonction pour fermer le modal
function fermerModal() {
    document.getElementById('modal-paiement').style.display = 'none';
    serviceSelectionne = null;
}

// Fonction pour copier le numéro de paiement
function copierNumero(operateur) {
    const operateurData = NUMEROS_PAIEMENT[operateur];
    if (!operateurData) {
        alert('Opérateur non reconnu');
        return;
    }
    
    const numero = operateurData.numero;
    
    // Utiliser l'API Clipboard moderne
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(numero).then(function() {
            alert('✅ Numéro ' + operateur + ' copié : ' + numero);
        }).catch(function(err) {
            fallbackCopyText(numero, operateur);
        });
    } else {
        fallbackCopyText(numero, operateur);
    }
}

// Méthode de secours pour copier le texte
function fallbackCopyText(text, operateur) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {}
        const successful = document.execCommand('copy');
        if (successful) {
            alert('✅ Numéro ' + operateur + ' copié : ' + text);
        } else {
            alert('❌ Impossible de copier le numéro. Veuillez le noter manuellement : ' + text);
        }
    } catch (err) ;{
        alert('❌ Erreur lors de la copie. Veuillez noter le numéro manuellement : ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Fermer le modal en cliquant à l'extérieur
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-paiement');
    if (event.target === modal) {
        fermerModal();
    }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fermerModal();
    }
});

// Initialisation après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Système de paiement initialisé');
    
    // Ajouter les écouteurs d'événements pour les boutons de service
    const boutonsPaiement = document.querySelectorAll('[onclick^="afficherModalPaiement"]');
    boutonsPaiement.forEach(function(bouton) {
        // Les écouteurs sont déjà dans le HTML via onclick
    });
});