import { useEffect, RefObject } from 'react';

export function useStaticNoise(staticFlashRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const staticFlash = staticFlashRef.current;
    if (!staticFlash) return;

    const tileSize = 256;
    const tileCanvas = document.createElement('canvas');
    tileCanvas.width = tileSize;
    tileCanvas.height = tileSize;
    const tileCtx = tileCanvas.getContext('2d', { alpha: false });
    if (!tileCtx) return;

    const tileImg = tileCtx.createImageData(tileSize, tileSize);
    const buf32 = new Uint32Array(tileImg.data.buffer);

    const palette = [
      0xff141514,
      0xff1e201f,
      0xff383c3a,
      0xff787d7a,
      0xffc8c3b8,
      0xfff4f0ea,
      0xffffffff,
    ];

    for (let i = 0; i < buf32.length; i++) {
      const r = Math.random();
      if (r < 0.34) buf32[i] = palette[0];
      else if (r < 0.5) buf32[i] = palette[1];
      else if (r < 0.58) buf32[i] = palette[2];
      else if (r < 0.65) buf32[i] = palette[3];
      else if (r < 0.74) buf32[i] = palette[4];
      else if (r < 0.92) buf32[i] = palette[5];
      else buf32[i] = palette[6];
    }
    tileCtx.putImageData(tileImg, 0, 0);

    const dataUrl = tileCanvas.toDataURL('image/png');
    staticFlash.style.backgroundImage = `url(${dataUrl})`;
    const dprFlash = Math.min(window.devicePixelRatio || 1, 3);
    staticFlash.style.backgroundSize = `${Math.round(tileSize / dprFlash)}px ${Math.round(tileSize / dprFlash)}px`;
  }, [staticFlashRef]);
}
