
import { GoogleGenAI, Type } from "@google/genai";
import { PortfolioData } from "../types";

export const fetchPortfolioContent = async (): Promise<PortfolioData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const schema = {
    type: Type.OBJECT,
    properties: {
      headerLogo: { type: Type.STRING, description: "URL for a simple logo icon (e.g., https://img.icons8.com/...)" },
      name: { type: Type.STRING },
      role: { type: Type.STRING },
      intro: { type: Type.STRING },
      heroBackgroundImage: { type: Type.STRING, description: "URL for the main home screen background image (coding themed)" },
      aboutMe: { type: Type.STRING },
      aboutImage: { type: Type.STRING, description: "URL for a professional portrait" },
      education: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            degree: { type: Type.STRING },
            institution: { type: Type.STRING },
            year: { type: Type.STRING },
            score: { type: Type.STRING },
            details: { type: Type.STRING },
          },
        },
      },
      skills: { 
        type: Type.ARRAY, 
        items: { 
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                icon: { type: Type.STRING, description: "URL to a small icon/logo for the skill" }
            }
        } 
      },
      projects: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
            link: { type: Type.STRING },
            image: { type: Type.STRING, description: "URL to a project screenshot" }
          },
        },
      },
      experience: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            company: { type: Type.STRING },
            duration: { type: Type.STRING },
            description: { type: Type.STRING },
          },
        },
      },
      certificates: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            issuer: { type: Type.STRING },
            year: { type: Type.STRING },
            issuerLogo: { type: Type.STRING, description: "URL to issuer logo" },
            certificateImage: { type: Type.STRING, description: "URL to certificate proof" }
          },
        },
      },
      contactEmail: { type: Type.STRING },
      location: { type: Type.STRING },
      resumeLink: { type: Type.STRING },
      offeredServices: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Service name (e.g. Web Development)" },
            description: { type: Type.STRING, description: "Short description of the service" },
            price: { type: Type.STRING, description: "Starting price e.g. ₹10000" },
          }
        }
      },
      consultationTopics: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING, description: "Consultation topic (e.g. Career Guidance)" },
            description: { type: Type.STRING },
            price: { type: Type.STRING },
          }
        }
      },
      paymentDetails: { type: Type.STRING },
      footerTitle: { type: Type.STRING, description: "Catchy footer headline (e.g. Let's Build The Future)" },
      footerText: { type: Type.STRING, description: "Short footer bio or call to action" },
      socialLinks: {
          type: Type.ARRAY,
          items: {
              type: Type.OBJECT,
              properties: {
                  platform: { type: Type.STRING },
                  url: { type: Type.STRING }
              }
          }
      }
    },
    required: ["headerLogo", "name", "role", "skills", "projects", "aboutImage", "socialLinks", "offeredServices", "consultationTopics"],
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Generate data for a Senior Full Stack Developer portfolio. Use placeholder image URLs from unsplash or icons8 for logos/icons. Ensure 'headerLogo' is a URL to a cool tech icon. Ensure 'aboutImage' is a URL to a developer portrait. Ensure 'heroBackgroundImage' is a cool coding wallpaper. IMPORTANT: Use Indian Rupee symbol (₹) for all 'price' fields in consultationTopics and offeredServices. Create 3 distinct 'offeredServices' (e.g., Full Stack Dev, UI/UX, Mobile Apps) with prices, and 3 'consultationTopics' (e.g., 1:1 Mentorship, Code Review).",
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const text = response.text;
  if (!text) throw new Error("No data returned from Gemini");

  return JSON.parse(text) as PortfolioData;
};