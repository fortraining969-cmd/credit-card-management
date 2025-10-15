// src/services/managerApi.ts
export type ApplicationStatus = "pending" | "approved" | "rejected";

export type CardApplication = {
  id: string;
  applicantName: string;
  applicantEmail?: string;
  applicantPhone?: string;
  appliedOn: string; // ISO date
  score: number; // credit evaluation score 300-900 (mock)
  requestedLimit: number;
  reason?: string;
  status: ApplicationStatus;
  notes?: string; // manager notes
};

const STORAGE_KEY = "creda_manager_applications_v1";

/** Seed with some mock applications if none exist */
function seedIfEmpty() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const now = Date.now();
    const seed: CardApplication[] = [
      {
        id: String(now - 1000 * 60 * 60 * 24 * 3),
        applicantName: "Rohit Sharma",
        applicantEmail: "rohit@example.com",
        applicantPhone: "9876543210",
        appliedOn: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
        score: 750,
        requestedLimit: 150000,
        reason: "Travel expenses",
        status: "pending",
      },
      {
        id: String(now - 1000 * 60 * 60 * 24 * 2),
        applicantName: "Priya Singh",
        applicantEmail: "priya@example.com",
        applicantPhone: "9123456780",
        appliedOn: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
        score: 680,
        requestedLimit: 50000,
        reason: "Rewards & cashback",
        status: "pending",
      },
      {
        id: String(now - 1000 * 60 * 60 * 24),
        applicantName: "Aman Gupta",
        applicantEmail: "aman@example.com",
        applicantPhone: "9012345678",
        appliedOn: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
        score: 610,
        requestedLimit: 30000,
        reason: "Build credit history",
        status: "pending",
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
}

export async function getApplications(): Promise<CardApplication[]> {
  seedIfEmpty();
  const raw = localStorage.getItem(STORAGE_KEY) || "[]";
  try {
    const parsed = JSON.parse(raw) as CardApplication[];
    // sort newest first
    return parsed.sort((a, b) => Number(b.id) - Number(a.id));
  } catch {
    return [];
  }
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Promise<CardApplication | null> {
  const apps = await getApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  apps[idx] = { ...apps[idx], status, notes: notes ?? apps[idx].notes };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  return apps[idx];
}

export async function addApplication(app: Omit<CardApplication, "id" | "status" | "appliedOn">): Promise<CardApplication> {
  const apps = await getApplications();
  const newApp: CardApplication = {
    ...app,
    id: String(Date.now()),
    appliedOn: new Date().toISOString(),
    status: "pending",
  };
  apps.unshift(newApp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  return newApp;
}
