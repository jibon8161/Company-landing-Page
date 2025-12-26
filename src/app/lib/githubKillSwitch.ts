// src/app/lib/githubKillSwitch.ts
interface KillSwitchStatus {
  enabled: boolean;
  redirectUrl: string;
  message?: string;
  updatedAt?: string;
}

export class KillSwitchManager {
  private gistUrl: string;
  private cacheDuration: number;
  private cache: { data: KillSwitchStatus; timestamp: number } | null = null;

  constructor(gistUrl: string, cacheDuration = 60000) {
    this.gistUrl = gistUrl;
    this.cacheDuration = cacheDuration;
  }

  async checkStatus(): Promise<KillSwitchStatus> {
    try {
      // Check cache first
      const cached = this.getCachedStatus();
      if (cached) {
        return cached;
      }

      // Fetch from GitHub Gist with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(this.gistUrl, {
        signal: controller.signal,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }

      const data = await response.json();

      // Validate the response
      const status: KillSwitchStatus = {
        enabled: Boolean(data.killSwitch),
        redirectUrl: data.redirectUrl || "https://google.com",
        message: data.message,
        updatedAt: data.updatedAt,
      };

      // Cache the result
      this.cacheStatus(status);

      return status;
    } catch (error) {
      console.error("Failed to check kill switch:", error);

      // Fallback: Return disabled status
      return {
        enabled: false,
        redirectUrl: "",
        message: "Unable to verify kill switch status",
      };
    }
  }

  private getCachedStatus(): KillSwitchStatus | null {
    if (this.cache && Date.now() - this.cache.timestamp < this.cacheDuration) {
      return this.cache.data;
    }
    return null;
  }

  private cacheStatus(data: KillSwitchStatus): void {
    this.cache = {
      data,
      timestamp: Date.now(),
    };
  }

  // Utility method to manually update cache
  clearCache(): void {
    this.cache = null;
  }
}

// Create singleton instance
// Replace with your actual gist URL
const GIST_URL =
  process.env.KILL_SWITCH_GIST_URL ||
  "https://gist.githubusercontent.com/jibon8161/4995d64b8c27d3f5fece51d09e371b5f/raw/kill-switch.json";
export const killSwitchManager = new KillSwitchManager(GIST_URL);
