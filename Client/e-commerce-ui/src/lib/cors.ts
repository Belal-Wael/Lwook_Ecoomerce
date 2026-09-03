import { NextRequest, NextResponse } from "next/server";

// Get allowed origins from environment variable or use default
const getAllowedOrigins = (): string[] => {
  const origins = process.env.CORS_ORIGINS || "http://localhost:3000,http://localhost:3001";
  return origins.split(",").map(origin => origin.trim());
};

// Check if origin is allowed
const isOriginAllowed = (origin: string | null): boolean => {
  if (!origin) return false;
  const allowedOrigins = getAllowedOrigins();
  return allowedOrigins.includes(origin);
};

// Get CORS headers
export const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = isOriginAllowed(origin) ? origin : getAllowedOrigins()[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
  };
};

// Handle OPTIONS preflight request
export const handleCors = (request: NextRequest) => {
  const origin = request.headers.get("origin");
  const headers = getCorsHeaders(origin);
  
  return NextResponse.json({}, { headers });
};

// Wrapper to add CORS headers to any response
export const withCors = (response: NextResponse, request: NextRequest) => {
  const origin = request.headers.get("origin");
  const headers = getCorsHeaders(origin);
  
  // Merge existing headers with CORS headers
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
};
