import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Create a client account for the sample jobs
  const client = await prisma.user.upsert({
    where: {
      email: "client@jobsafrica.com",
    },
    update: {},
    create: {
      email: "client@jobsafrica.com",
      passwordHash: "seed-password",
      fullName: "Jobs Africa Client",
      role: "CLIENT",
      qualification: "PHD",
      skills: "Business, Management",
      experience: "5 years",
      location: "Uganda",
      bio: "Sample Jobs Africa client account.",
    },
  });

  const jobs = [
    {
      title: "Website Design",
      category: "Design",
      skills: "HTML, CSS, JavaScript, UI/UX",
      qualification: "UCE or higher",
      location: "Remote",
      budget: "$50 - $150",
      remote: true,
      description:
        "We are looking for a creative freelancer to design a modern and responsive business website.",
    },
    {
      title: "Social Media Manager",
      category: "Marketing",
      skills: "Social Media, Content Creation, Digital Marketing",
      qualification: "UCE or higher",
      location: "Remote",
      budget: "$30 - $100",
      remote: true,
      description:
        "Manage social media pages, create engaging content and help grow our online audience.",
    },
    {
      title: "Data Entry Assistant",
      category: "Data Entry",
      skills: "Microsoft Excel, Data Entry, Typing",
      qualification: "UCE or higher",
      location: "Uganda",
      budget: "$20 - $80",
      remote: false,
      description:
        "Enter and organize business information accurately into our digital records.",
    },
    {
      title: "Content Writer",
      category: "Writing",
      skills: "Writing, Research, Communication",
      qualification: "UACE or higher",
      location: "Remote",
      budget: "$40 - $120",
      remote: true,
      description:
        "Write clear and engaging articles for websites, blogs and social media platforms.",
    },
    {
      title: "Logo Designer",
      category: "Design",
      skills: "Graphic Design, Adobe Photoshop, Illustrator",
      qualification: "UCE or higher",
      location: "Remote",
      budget: "$25 - $75",
      remote: true,
      description:
        "Create a professional logo and basic brand identity for a growing African business.",
    },
    {
      title: "Virtual Assistant",
      category: "Technology",
      skills: "Microsoft Office, Email Management, Research",
      qualification: "UCE or higher",
      location: "Uganda",
      budget: "$50 - $150",
      remote: false,
      description:
        "Assist with email management, research, scheduling and basic administrative tasks.",
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({
      data: {
        title: job.title,
        description: job.description,
        category: job.category,
        skills: job.skills,
        qualification: job.qualification,
        location: job.location,
        budget: job.budget,
        remote: job.remote,
        clientId: client.id,
      },
    });
  }

  console.log("Jobs created successfully.");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });