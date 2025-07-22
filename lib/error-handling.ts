export class SkillNotFoundError extends Error {
  constructor(id: string) {
    super(`Skill with ID ${id} not found`);
    this.name = "SkillNotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "Unauthorized access") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message: string = "Access forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network error occurred") {
    super(message);
    this.name = "NetworkError";
  }
}

export class ServerError extends Error {
  constructor(message: string = "Internal server error") {
    super(message);
    this.name = "ServerError";
  }
}

export function handleApiError(response: Response, resourceId?: string): never {
  const status = response.status;

  switch (status) {
    case 401:
      throw new UnauthorizedError(
        "You need to be logged in to access this resource"
      );
    case 403:
      throw new ForbiddenError(
        "You don't have permission to access this resource"
      );
    case 404:
      if (resourceId) {
        throw new SkillNotFoundError(resourceId);
      }
      throw new Error("Resource not found");
    case 500:
      throw new ServerError("Internal server error. Please try again later");
    case 502:
    case 503:
    case 504:
      throw new NetworkError(
        "Server is temporarily unavailable. Please try again later"
      );
    default:
      throw new Error(`Request failed with status ${status}`);
  }
}

export async function fetchWithErrorHandling(
  url: string,
  options: RequestInit = {},
  resourceId?: string
): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      handleApiError(response, resourceId);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new NetworkError("Network request failed");
  }
}
