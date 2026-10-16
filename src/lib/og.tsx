import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/constants';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = 'fidzzcodex, developer bot WhatsApp, Telegram, dan web';

export function renderOgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#0D0D0D',
          padding: 72,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: '2px solid #2E2E2E',
            borderRadius: 20,
            backgroundColor: '#1A1A1A',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '22px 28px',
              borderBottom: '2px solid #2E2E2E',
              backgroundColor: '#242424',
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#FF5F56',
                marginRight: 12,
              }}
            />
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#FFBD2E',
                marginRight: 12,
              }}
            />
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#27C93F',
                marginRight: 24,
              }}
            />
            <div style={{ display: 'flex', fontSize: 26, color: '#888888' }}>
              {`terminal - ${SITE.name}`}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '52px 44px',
              color: '#E8E8E8',
            }}
          >
            <div style={{ display: 'flex', fontSize: 40 }}>
              <div style={{ display: 'flex', color: '#4ADE80', marginRight: 20 }}>$</div>
              <div style={{ display: 'flex' }}>whoami</div>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 84,
                fontWeight: 700,
                margin: '14px 0 30px',
              }}
            >
              <div style={{ display: 'flex', marginRight: 24 }}>{'>'}</div>
              <div style={{ display: 'flex' }}>{SITE.name}</div>
            </div>
            <div style={{ display: 'flex', fontSize: 34, color: '#888888' }}>
              Developer • Bot WhatsApp • Telegram • Web
            </div>
            <div style={{ display: 'flex', fontSize: 30, color: '#4ADE80', marginTop: 22 }}>
              {SITE.tagline}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
