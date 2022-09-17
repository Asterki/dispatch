const fr = {
    main: {
        welcome: {
            title: "Bienvenue sur l'application!",

            navbar: {
                login: "Connexion",
                register: "S'inscrire",
                about: "À propos de",
                support: "Soutien",
                download: "Télécharger",
            },
        },
        home: {
            pageTitle: "DIMLIM | Accueil",
            title: "Accueil",

            navbar: {
                profile: "Profil",
                settings: "Paramètres",

                logout: "Déconnexion",
            },

            contacts: "Contacts",
            blocked: "Bloqué",

            addContact: "Ajouter un contact",
            noContacts: "Vous n'avez pas encore de contacts, commencez par appuyer sur Ajouter un contact",

            blockedContacts: "Contacts bloqués",
            noBlockedContacts: "Vous n'avez pas encore de contacts bloqués",

            dialogs: {
                addContact: {
                    title: "Ajouter un contact",
                    label: "Veuillez insérer le nom d'utilisateur de la personne",

                    cancel: "Annuler",
                    add: "Ajouter",

                    "missing-parameters": "Veuillez remplir toutes les entrées.",
                    "self-add": "Vous ne pouvez pas vous ajouter comme contact",
                    "already-on-list": "Cet utilisateur est déjà dans vos contacts.",
                    "user-not-found": "Il n'y a pas d'utilisateur avec ce nom d'utilisateur",
                },
            },
        },
    },
    accounts: {
        login: {
            pageTitle: "DIMLIM | Connexion",
            title: "Connectez-vous à DIMLIM",

            email: "Email",
            password: "Mot de passe",
            tfa: "Authentification à deux facteurs",

            login: "Connexion",
            submit: "Soumettre",
            forgotPassword: "Mot de passe oublié?",
            doNotHaveAnAccount: "Vous n'avez pas encore de compte? & S'inscrire",
            tfaHelp: "Accédez à votre application d'authentification et insérez le code à 6 chiffres, ou insérez l'un de vos codes de secours",

            emailRequired: "Un email est requis.",
            passwordRequired: "Mot de passe requis.",
            emailInvalid: "Le courriel est invalide.",
            emailOrPasswordIncorrect: "Email ou mot de passe incorrect.",
            rateLimitExceeded: "Trop de tentatives de connexion, veuillez réessayer plus tard.",
            invalidTfa: "Code TFA invalide, veuillez réessayer.",

            navbar: {
                login: "Connexion",
                register: "S'inscrire",
                about: "À propos de",
                support: "Soutien",
                download: "Télécharger",
            },
        },
        register: {
            pageTitle: "DIMLIM | S'inscrire",
            title: "Inscrivez-vous dans DIMLIM",

            email: "Email",
            username: "Nom d'utilisateur",
            password: "Mot de passe",
            confirmPassword: "Confirmez le mot de passe",

            register: "S'inscrire",
            alreadyHaveAnAccount: "Vous avez déjà un compte? & Connexion",

            emailRequired: "L'email est requis",
            usernameRequired: "Nom d'utilisateur est nécessaire",
            passwordRequired: "Mot de passe requis",
            confirmPasswordRequired: "Veuillez confirmer votre mot de passe",

            emailInvalid: "Email est invalide",
            usernameInvalid: "Les noms d'utilisateur ne peuvent contenir que des lettres, des chiffres et des points (.)",
            usernameLength: "Le nom d'utilisateur doit être compris entre 3 et 32 caractères",
            passwordLength: "Le mot de passe doit comporter entre 8 et 256 caractères",

            usernameInUse: "Nom d'utilisateur est déjà utilisé",
            emailInUse: "Cet email est déjà utilisé",
            rateLimitExceeded: "Vous avez déjà enregistré un compte récemment, veuillez réessayer plus tard",

            navbar: {
                login: "Connexion",
                register: "S'inscrire",
                about: "À propos de",
                support: "Soutien",
                download: "Télécharger",
            },
        },
    },
    settings: {
        index: {
            pageTitle: "DIMLIM | Paramètres",
            title: "Paramètres DIMLIM",

            navbar: {
                profile: "Profil",
                settings: "Paramètres",

                logout: "Déconnexion",
            },

            tabs: {
                general: "Général",
                security: "Sécurité",
                privacy: "Confidentialité",
                account: "Compte",
            },

            general: {
                title: "Informations générales",
                username: "Nom d'utilisateur:",
                bio: "Biographie:",
                email: "Email:",
                preferredLanguage: "Langue préférée:",
                contacts: "Contacts:",
                blockedContacts: "Contacts bloqués:",
                creation: "Date de création du compte:",

                locales: {
                    de: "Deutsch",
                    en: "English",
                    es: "Español",
                    fr: "Français",
                    pr: "Português",
                },

                dialogs: {
                    avatar: {
                        title: "Voulez-vous utiliser cette image comme avatar?",
                        cancel: "Annuler",
                        yes: "Oui",
                    },
                    email: {
                        title: "Veuillez insérer votre nouvel e-mail",
                        subTitle: "Cet e-mail ne sera pas vérifié et vous devrez passer par le processus de re-vérification de votre e-mail",

                        newEmail: "Votre nouvel e-mail",
                        password: "Votre mot de passe actuel",

                        cancel: "Annuler",
                        yes: "Oui",

                        missing: "Veuillez remplir toutes les entrées",
                        invalidEmail: "L'e-mail que vous avez saisi n'est pas valide",

                        "email-already-in-use": "L'e-mail que vous avez saisi est déjà utilisé",
                        "user-not-found": "Ok mon pote, comment diable fais-tu ça alors, je ne vais même pas m'embêter",
                        "rate-limit-exceeded": "Vous avez trop essayé de modifier votre adresse e-mail, veuillez réessayer plus tard.",
                    },
                    Langue: {
                        title: "Veuillez sélectionner une langue",
                        subTitle: "Ceci définira la langue de l'application",

                        cancel: "Annuler",
                        change: "Changer de langue",
                    },
                    bio: {
                        title: "Veuillez insérer votre nouvelle biographie",
                        cancel: "Annuler",
                        change: "Changer la bio",
                    },
                },
            },
            security: {
                password: "Mot de passe",
                tfa: "Authentification à deux facteurs",

                tfaActive: "Actif",
                tfaNotActive: "Non configuré",

                dialogs: {
                    password: {
                        title: "Modifier le mot de passe",
                        old: "Votre ancien mot de passe",
                        new: "Votre nouveau mot de passe",
                        tfa: "Code TFA/Code de sauvegarde",

                        cancel: "Annuler",
                        change: "Modifier le mot de passe",

                        unauthorized: "Mot de passe invalide.",
                        "missing-parameters": "Veuillez remplir toutes les entrées.",
                        "invalid-parameters": "Votre nouveau mot de passe doit comporter plus de 8 caractères et moins de 256 caractères.",
                        "invalid-tfa-code": "Code TFA invalide, veuillez réessayer.",
                        "rate-limit-exceeded": "Vous avez trop essayé de changer votre mot de passe, veuillez réessayer plus tard.",
                    },
                    setupTfa: {
                        title: "Authentification à deux facteurs",
                        subTitle:
                            "TFA ajoute une couche de sécurité supplémentaire dans laquelle vous avez également besoin d'un appareil pour vous connecter à votre compte.",
                        deactivateLabel: "Code TFA/Code de sauvegarde",

                        emailVerified: "Vous devez vérifier votre adresse e-mail pour activer TFA",

                        activate: "Activer",
                        deactivate: "Désactiver",
                        cancel: "Annuler",
                        ok: "OK",

                        "missing-parameters": "Veuillez remplir toutes les entrées.",
                        "invalid-tfa-code": "Code TFA invalide, veuillez réessayer.",
                        "rate-limit-exceeded": "Vous avez trop essayé de désactiver TFA, veuillez réessayer plus tard.",
                    },
                    activerTfa: {
                        title: "Authentification à deux facteurs",
                        warning:
                            "ASSUREZ-VOUS D'ENTRER LE CODE SUR VOTRE APPLICATION TFA, VOUS NE VERREZ PLUS CE CODE, SI VOUS LE PERDEZ, VOUS PERDEZ VOTRE COMPTE",
                        done: "Fait",
                    },
                    backupTfa: {
                        title: "Authentification à deux facteurs",
                        subTitle: "Pour confirmer et obtenir vos codes de secours, veuillez insérer un code généré par votre application TFA",
                        warning:
                            "Ce sont vos codes de sauvegarde, si vous perdez votre appareil, vous pouvez utiliser ces codes pour récupérer votre compte, vous ne les reverrez plus, alors enregistrez-les dans un endroit sûr.",

                        done: "fait",
                        submit: "Soumettre",

                        "missing-parameters": "Veuillez remplir toutes les entrées.",
                        "invalid-tfa-code": "Code TFA invalide, veuillez réessayer.",
                        "rate-limit-exceeded": "Vous avez trop essayé de désactiver TFA, veuillez réessayer plus tard.",
                    },
                },
            },
            account: {
                emailStatus: "État de l'e-mail",
                emailVerified: "E-mail vérifié",
                emailNotVerified: "E-mail non vérifié",

                logout: "Déconnexion",
                logoutDesc: "Vos messages seront supprimés",

                deleteAccount: "Supprimer le compte",
                deleteAccount: "Supprimer tout sur votre compte",

                dialogues: {
                    verifyEmail: {
                        title: "Vérifiez votre adresse e-mail",
                        subTitle: "Vérifiez votre e-mail pour activer TFA et recevez les mises à jour de sécurité directement dans votre e-mail.",

                        verify: "Vérifier",
                        cancel: "Annuler",
                    },
                    verificationEmailSent: {
                        title: "vérifiez votre adresse e-mail",
                        subTitle: "Nous avons envoyé un e-mail à & avec un code, il expirera dans 5 heures.",
                        ok: "OK",
                    },
                    logout: {
                        title: "Déconnexion",
                        warning: "Tous vos messages seront supprimés pour des raisons de sécurité.",
                        cancel: "Annuler",
                    },
                    deleteAccount: {
                        title: "Supprimer le compte",
                        warning: "Vous ne pourrez pas récupérer votre compte après cela, procédez avec prudence.",

                        password: "Mot de passe",
                        tfaCode: "Code TFA/Code de sauvegarde",

                        cancel: "Annuler",

                        "missing-parameters": "Veuillez remplir toutes les entrées.",
                        "rate-limit-exceeded": "Vous avez trop essayé de supprimer votre compte, veuillez réessayer plus tard.",
                        "invalid-tfa-code": "Code TFA invalide",
                        unauthorized: "Mot de passe invalide",
                    },
                },
            },
        },
    },
};

module.exports = fr;
