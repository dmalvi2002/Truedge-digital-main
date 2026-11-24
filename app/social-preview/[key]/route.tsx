import { ImageResponse } from 'next/og';
import { previewTitle } from '@/lib/social-preview';

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const title = previewTitle((await params).key);
  if (!title) return new Response(null, { status: 404 });

  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', padding: '78px 96px', color: '#fff', background: 'linear-gradient(135deg, #0c0a18, #2e1c4e)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 27, letterSpacing: 5 }}>
        <div style={{ width: 15, height: 15, background: '#b694ff', transform: 'rotate(45deg)' }} />
        TRUEDGE DIGITAL
      </div>
      <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.04, maxWidth: 960, marginTop: 52 }}>{title}</div>
      <div style={{ fontSize: 25, color: '#dccaff', marginTop: 43 }}>truedgedigital.co.uk</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
