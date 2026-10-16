import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') || 'paramsync';
    const category = searchParams.get('category') || 'Next.js Query State Manager';
    const desc =
      searchParams.get('desc') ||
      'Type-Safe URL Query State Manager for Next.js and React with 0ms typing latency, Clean URL policy, and atomic batch transitions.';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#191b21',
            padding: '60px 80px',
            fontFamily: 'sans-serif',
            color: '#f4f4f5',
          }}
        >
          {/* Top Brand Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M6 3.5v17" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M6 4.75h6.5a4.75 4.75 0 0 1 4.75 4.75c0 1.25-.48 2.4-1.28 3.25" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M17.5 13.5l-2.2-.3.6-2.1" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.5 14.25H6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M7.75 12.75L6 14.25l1.75 1.5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  fontFamily: 'monospace',
                  color: '#ffffff',
                }}
              >
                paramsync
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: '9999px',
                border: '1px solid #383f4e',
                backgroundColor: '#23272f',
                fontSize: '16px',
                fontFamily: 'monospace',
                color: '#93c5fd',
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          </div>

          {/* Center Main Title & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 800,
                letterSpacing: '-1.5px',
                lineHeight: 1.1,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '24px',
                lineHeight: 1.45,
                color: '#a1a1aa',
                maxWidth: '960px',
              }}
            >
              {desc}
            </div>
          </div>

          {/* Bottom Badges / Stats Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '30px',
              borderTop: '1px solid #323846',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  color: '#e4e4e7',
                  fontFamily: 'monospace',
                }}
              >
                <span style={{ color: '#60a5fa' }}>•</span> 0ms Typing Lag
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  color: '#e4e4e7',
                  fontFamily: 'monospace',
                }}
              >
                <span style={{ color: '#34d399' }}>•</span> Clean URL Policy
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  color: '#e4e4e7',
                  fontFamily: 'monospace',
                }}
              >
                <span style={{ color: '#22d3ee' }}>•</span> Atomic Transitions
              </div>
            </div>

            <div
              style={{
                fontSize: '18px',
                fontFamily: 'monospace',
                color: '#71717a',
              }}
            >
              paramsync
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    return new Response(`Failed to generate image: ${e instanceof Error ? e.message : 'Unknown'}`, {
      status: 500,
    });
  }
}
