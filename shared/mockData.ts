import { Partner } from './types';

export const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Dr. Marie Dubois',
    domain: 'Intelligence Artificielle',
    compatibilityScore: 95,
    specialties: ['IA', 'Machine Learning', 'Deep Learning'],
    isRecommended: true,
    avatar: 'https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    institution: 'INRIA Paris',
    bio: 'Chercheuse experte en intelligence artificielle avec plus de 10 ans d\'expérience dans le développement d\'algorithmes d\'apprentissage automatique pour des applications industrielles.',
    technicalSkills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Computer Vision', 'NLP'],
    projects: [
      {
        id: 'p1',
        title: 'Système de reconnaissance vocale avancé',
        description: 'Développement d\'un modèle de reconnaissance vocale multi-langues avec une précision de 98%',
        status: 'completed',
        technologies: ['Python', 'TensorFlow', 'LSTM', 'Transformer']
      },
      {
        id: 'p2',
        title: 'Plateforme IA pour diagnostic médical',
        description: 'Création d\'un outil d\'aide au diagnostic basé sur l\'analyse d\'images médicales',
        status: 'in-progress',
        technologies: ['PyTorch', 'Computer Vision', 'CNN', 'DICOM']
      }
    ],
    collaborationNeeds: ['Expertise en développement mobile', 'Financement pour projet R&D', 'Partenaires industriels'],
    collaborationOffers: ['Formation en IA', 'Conseil en algorithmes ML', 'Prototypage rapide'],
    publications: [
      {
        id: 'pub1',
        title: 'Advanced Neural Networks for Medical Image Analysis',
        type: 'paper',
        url: 'https://arxiv.org/example1',
        date: '2024-01'
      },
      {
        id: 'pub2',
        title: 'Code source - Reconnaissance vocale',
        type: 'github',
        url: 'https://github.com/example/voice-recognition',
        date: '2023-12'
      }
    ]
  },
  {
    id: '2',
    name: 'Prof. Ahmed Ben Salem',
    domain: 'Blockchain & Cryptographie',
    compatibilityScore: 87,
    specialties: ['Blockchain', 'Cryptographie', 'S��curité'],
    isRecommended: false,
    avatar: 'https://images.pexels.com/photos/8326324/pexels-photo-8326324.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    institution: 'École Polytechnique',
    bio: 'Professeur spécialisé dans les technologies blockchain et la cryptographie, avec une expertise particulière dans les systèmes distribués sécurisés.',
    technicalSkills: ['Solidity', 'Go', 'Rust', 'Cryptographie', 'Ethereum', 'Hyperledger'],
    projects: [
      {
        id: 'p3',
        title: 'Plateforme de vote électronique sécurisé',
        description: 'Développement d\'un système de vote basé sur la blockchain garantissant anonymat et transparence',
        status: 'completed',
        technologies: ['Ethereum', 'Solidity', 'IPFS', 'React']
      }
    ],
    collaborationNeeds: ['Développeurs frontend', 'Expertise UX/UI', 'Tests de sécurité'],
    collaborationOffers: ['Audit sécurité blockchain', 'Formation cryptographie', 'Architecture systèmes distribués'],
    publications: [
      {
        id: 'pub3',
        title: 'Secure Voting Systems Using Blockchain Technology',
        type: 'paper',
        url: 'https://ieee.org/example1',
        date: '2023-11'
      }
    ]
  },
  {
    id: '3',
    name: 'Sarah Martinez',
    domain: 'GreenTech & IoT',
    compatibilityScore: 91,
    specialties: ['GreenTech', 'IoT', 'Sustainability'],
    isRecommended: true,
    avatar: 'https://images.pexels.com/photos/3194524/pexels-photo-3194524.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    institution: 'CentraleSupélec',
    bio: 'Ingénieure spécialisée dans les technologies vertes et l\'Internet des Objets, passionnée par l\'innovation durable.',
    technicalSkills: ['Arduino', 'Raspberry Pi', 'LoRaWAN', 'Node.js', 'MongoDB', 'Solar Tech'],
    projects: [
      {
        id: 'p4',
        title: 'Réseau de capteurs environnementaux',
        description: 'Déploiement d\'un réseau IoT pour la surveillance de la qualité de l\'air en temps réel',
        status: 'in-progress',
        technologies: ['LoRaWAN', 'Arduino', 'Node.js', 'MongoDB']
      },
      {
        id: 'p5',
        title: 'Système de gestion énergétique intelligent',
        description: 'Solution IoT pour optimiser la consommation énergétique des bâtiments',
        status: 'planned',
        technologies: ['Zigbee', 'Machine Learning', 'React', 'InfluxDB']
      }
    ],
    collaborationNeeds: ['Financement startup', 'Expertise marketing digital', 'Partenaires industriels'],
    collaborationOffers: ['Prototypage IoT', 'Conseil énergie renouvelable', 'Formation systèmes embarqués'],
    publications: [
      {
        id: 'pub4',
        title: 'IoT Networks for Environmental Monitoring',
        type: 'article',
        url: 'https://techreview.com/example1',
        date: '2024-02'
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. Jean Moreau',
    domain: 'Robotique & Automatisation',
    compatibilityScore: 78,
    specialties: ['Robotique', 'Automatisation', 'Vision par ordinateur'],
    isRecommended: false,
    avatar: 'https://images.pexels.com/photos/5726690/pexels-photo-5726690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    institution: 'LAAS-CNRS',
    bio: 'Chercheur en robotique avec une expertise en vision par ordinateur et systèmes autonomes pour l\'industrie 4.0.',
    technicalSkills: ['ROS', 'OpenCV', 'C++', 'Python', 'MATLAB', 'PLC Programming'],
    projects: [
      {
        id: 'p6',
        title: 'Robot collaboratif pour l\'assemblage',
        description: 'Développement d\'un bras robotique collaboratif pour l\'industrie automobile',
        status: 'completed',
        technologies: ['ROS', 'C++', 'Computer Vision', 'Gazebo']
      }
    ],
    collaborationNeeds: ['Partenaires industriels', 'Expertise en sécurité robotique', 'Tests en conditions réelles'],
    collaborationOffers: ['Expertise robotique', 'Formation ROS', 'Prototypage automatisation'],
    publications: [
      {
        id: 'pub5',
        title: 'Collaborative Robotics in Manufacturing',
        type: 'paper',
        url: 'https://robotics-journal.com/example1',
        date: '2023-09'
      }
    ]
  },
  {
    id: '5',
    name: 'Lisa Chen',
    domain: 'Cybersécurité & Cloud',
    compatibilityScore: 84,
    specialties: ['Cybersécurité', 'Cloud Computing', 'DevSecOps'],
    isRecommended: true,
    avatar: 'https://images.pexels.com/photos/17124739/pexels-photo-17124739.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    institution: 'Thales Security',
    bio: 'Experte en cybersécurité et architectures cloud sécurisées, spécialisée dans l\'intégration DevSecOps.',
    technicalSkills: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'Security Auditing'],
    projects: [
      {
        id: 'p7',
        title: 'Infrastructure cloud sécurisée multi-tenant',
        description: 'Architecture cloud résiliente avec chiffrement de bout en bout',
        status: 'in-progress',
        technologies: ['AWS', 'Kubernetes', 'Terraform', 'Vault']
      }
    ],
    collaborationNeeds: ['Développeurs backend', 'Expertise en compliance', 'Tests de pénétration'],
    collaborationOffers: ['Audit sécurité cloud', 'Formation DevSecOps', 'Architecture sécurisée'],
    publications: [
      {
        id: 'pub6',
        title: 'Secure Cloud Architecture Best Practices',
        type: 'documentation',
        url: 'https://security-docs.com/example1',
        date: '2024-01'
      }
    ]
  },
  {
    id: '6',
    name: 'Marc Leroy',
    domain: 'Data Science & Analytics',
    compatibilityScore: 89,
    specialties: ['Data Science', 'Analytics', 'Business Intelligence'],
    isRecommended: false,
    avatar: 'https://images.pexels.com/photos/7567426/pexels-photo-7567426.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    institution: 'Université Paris-Saclay',
    bio: 'Data scientist senior avec une forte expertise en analyse prédictive et visualisation de données complexes.',
    technicalSkills: ['R', 'Python', 'SQL', 'Tableau', 'Power BI', 'Apache Spark'],
    projects: [
      {
        id: 'p8',
        title: 'Plateforme d\'analyse prédictive retail',
        description: 'Système de prédiction des ventes et optimisation des stocks pour grande distribution',
        status: 'completed',
        technologies: ['Python', 'Apache Spark', 'Tableau', 'PostgreSQL']
      }
    ],
    collaborationNeeds: ['Données sectorielles', 'Expertise métier retail', 'Infrastructure big data'],
    collaborationOffers: ['Analyse de données', 'Formation analytics', 'Tableaux de bord'],
    publications: [
      {
        id: 'pub7',
        title: 'Predictive Analytics in Retail: A Case Study',
        type: 'article',
        url: 'https://data-journal.com/example1',
        date: '2023-10'
      }
    ]
  }
];
