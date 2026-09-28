import db from '../models/index.js';
import bcrypt from 'bcryptjs';

const summary = (name) => `${name} is an Informatics Engineering graduate from Politeknik Negeri Jakarta (September 2021–August 2025), GPA 3.64/4.00, with an Associate Track (CEP-CCIT FTUI, GPA 3.55/4.00). Full-stack and software developer experienced in Flutter, .NET, Laravel, Vue.js, and Tailwind CSS; RHEL administration and disaster recovery; and AI-enabled applicant screening and RAG applications. Education and achievements include a Java Technologies (NIIT) Certificate with Outstanding Predicate; IISMA Exchange Scholar at Ulsan College, South Korea (Fall 2023, GPA 4.21/4.50), including an eight-week engineering internship at HNIX (Hyundai Heavy Industries); TOEIC Prediction 950/990 (2025) and TOEIC 935/990 (2023). Certifications: Web Developer, LSP Informatika–BNSP (2025); Junior Mobile Programmer, LSP Informatika–BNSP (2024). Leadership: Board of Directors, Communication & Information Division, HIMATIK; field coordinator for a departmental community service event; Karate Club member (2021–2024).`;

const experiences = [
  {
    company: 'TRANS 7',
    role: 'Software Developer',
    startDate: '2026-03-01',
    endDate: null,
    description: 'Engineered a cross-platform Flutter interface for the enterprise IT Helpdesk, supporting hardware repair and software troubleshooting workflows, and implemented user feedback and rating systems. Architected an AI screening pipeline using Qwen 3.5, cosine-similarity embeddings, and a re-ranker to score 200,000+ candidates against job descriptions. Automated CV summarization and candidate matching to reduce manual HR screening.'
  },
  {
    company: 'National Research and Innovation Agency (BRIN)',
    role: 'Software Developer Intern',
    startDate: '2025-12-01',
    endDate: '2026-02-28',
    description: 'Built a dashboard for 1,000+ research innovation products. Added search, filtering, structured input forms, and improved validation workflows to make content management more usable, efficient, and reliable.'
  },
  {
    company: 'Gobel International',
    role: 'Digital Transformation Intern',
    startDate: '2025-08-01',
    endDate: '2025-11-30',
    description: 'Administered 15+ RHEL servers and reduced unplanned downtime by 15% through patching and performance monitoring. Automated database backups to support 99.9% data availability for disaster recovery. Developed 5+ back-end features for a virtual ID card portal, reducing employee registration time by approximately 80%.'
  },
  {
    company: 'PT. KAI Properti Manajemen',
    role: 'Software Engineer Intern',
    startDate: '2024-09-01',
    endDate: '2025-01-31',
    description: 'Built responsive web applications using Laravel and Tailwind CSS with a .NET backend. Implemented QR-based tracking for 200+ company assets, reducing lookup time from five minutes to under ten seconds. Collaborated with two developers to deliver five major application updates ahead of schedule.'
  }
];

const projects = [
  {
    name: 'Research Assistant — AI Land-Mafia Prevention Chatbot',
    description: 'Research assistant (2026) on applying an AI-based chatbot to prevent land mafia activity, in partnership with Sekar Anindita and Partners Law Firm.'
  },
  {
    name: 'Legal Scope',
    description: 'Led end-to-end development of an interactive chatbot that makes Indonesian criminal-law information more accessible through conversational queries about legal definitions, procedures, and penalties.'
  },
  {
    name: 'Halo PNJ',
    description: 'Developed a web-based management system for Politeknik Negeri Jakarta Student Affairs and Academic Services chatbot, including preprocessing for a Retrieval-Augmented Generation (RAG) service.'
  }
];

const skills = [
  'Flutter', 'Qwen 3.5', 'Cosine Similarity', 'Embeddings', 'Reranker Models',
  'RHEL', 'Linux Administration', 'Disaster Recovery', 'Database Backup Automation',
  '.NET', 'Laravel', 'Vue.js', 'Tailwind CSS', 'Java', 'Android Studio',
  'Firebase', 'Google Cloud Platform', 'HTML', 'CSS', 'JavaScript', 'ITIL',
  'Retrieval-Augmented Generation (RAG)', 'Full-Stack Development'
];

async function seedRecord(Model, where, values, userId, transaction) {
  let record = await Model.findOne({ where, transaction });
  if (!record) {
    record = await Model.create({ ...values, userId }, { transaction });
    return 'created';
  }

  if (record.userId == null && userId != null) {
    await record.update({ userId }, { transaction });
    return 'linked';
  }

  return 'existing';
}

async function main() {
  const counts = { created: 0, linked: 0, existing: 0 };
  const { CV_EMAIL, CV_NAME, CV_PROFESSION, CV_USERNAME, CV_PASSWORD } = process.env;

  if (!CV_EMAIL || !CV_NAME || !CV_PROFESSION) {
    throw new Error('Set CV_EMAIL, CV_NAME, and CV_PROFESSION to seed the profile.');
  }
  const normalizedEmail = CV_EMAIL.trim().toLowerCase();

  try {
    await db.sequelize.authenticate();
    await db.sequelize.transaction(async (transaction) => {
      let user = await db.User.findOne({
        where: { email: normalizedEmail },
        transaction
      });
      let profileStatus;
      const profile = {
        name: CV_NAME,
        profession: CV_PROFESSION,
        summary: summary(CV_NAME)
      };

      if (!user) {
        if (!CV_USERNAME || !CV_PASSWORD) {
          throw new Error('No user matches CV_EMAIL. Set CV_USERNAME and CV_PASSWORD to create the CV profile account.');
        }
        user = await db.User.create({
          ...profile,
          email: normalizedEmail,
          username: CV_USERNAME,
          password: await bcrypt.hash(CV_PASSWORD, 12),
          role: 'user'
        }, { transaction });
        counts.created++;
        profileStatus = 'created';
      } else {
        await user.update(profile, { transaction });
        profileStatus = 'updated';
      }
      const userId = user.id;

      for (const experience of experiences) {
        const where = {
          company: experience.company,
          role: experience.role
        };
        counts[await seedRecord(db.Experiences, where, experience, userId, transaction)]++;
      }

      for (const project of projects) {
        counts[await seedRecord(db.Project, { name: project.name }, project, userId, transaction)]++;
      }

      for (const name of skills) {
        counts[await seedRecord(db.Skill, { name }, { name, level: null }, userId, transaction)]++;
      }

      console.log(`CV portfolio seed complete for ${normalizedEmail}: profile ${profileStatus}, ${counts.created} records created, ${counts.linked} linked, ${counts.existing} already present.`);
    });
  } finally {
    await db.sequelize.close();
  }
}

main().catch((error) => {
  console.error('CV portfolio seed failed:', error.message);
  process.exitCode = 1;
});
