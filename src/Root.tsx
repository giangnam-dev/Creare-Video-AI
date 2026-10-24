import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Video, type VideoProps} from './Video';

const defaultSlug = '2026-10-21-httpsenwikipediaorgwikisperseuscluster-style-ultrafast-pacing-cinematic-space-documentary-creepy';
const defaultDuration = 958;
const defaultWidth = 1080;
const defaultHeight = 1920;

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Video"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component={Video as any}
    durationInFrames={defaultDuration}
    fps={30}
    width={defaultWidth}
    height={defaultHeight}
    defaultProps={{slug: defaultSlug} satisfies VideoProps}
  />
);

registerRoot(RemotionRoot);


