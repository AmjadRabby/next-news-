// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    name: "PortEXE",
    position: "Software Engineer",
    image:
      "https://pbs.twimg.com/profile_images/1345080486385901568/r-Et9x5E_400x400.jpg",
    description: "Dev guy and tutorialist",
  });
}
