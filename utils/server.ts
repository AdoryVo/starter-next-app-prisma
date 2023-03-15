import { NextResponse } from 'next/server'

/**
 * Accepts a simple response body and returns it as a JSON.
 *
 * @param body Serializable body
 * @param status HTTP status code
 */
export function json(body: any, status: number) {
  return NextResponse.json(body, { status })
}
