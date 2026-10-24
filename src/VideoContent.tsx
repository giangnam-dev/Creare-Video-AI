import React from 'react';
import {Audio, staticFile} from 'remotion';
import {TransitionSeries} from '@remotion/transitions';
import {
  addTransitionHandles,
  FreeStyleLayout,
  freeStyleTransition,
} from './templates/creative/free-style';
import {
  Scene1BlackHoleHook,
  Scene2PerseusCluster,
  Scene3AudioFilterDashboard,
  Scene4GasWavefront,
  Scene5PitchShift,
  Scene6Listen,
} from './scenes/PerseusScenes';
import {COLORS, SCENE_DURATIONS} from './scenes/tokens';

const transition1 = freeStyleTransition.energeticSlide('from-right', 18);
const transition2 = freeStyleTransition.technicalFlip('from-right', 20);
const transition3 = freeStyleTransition.directionalWipe('from-left', 18);
const transition4 = freeStyleTransition.softFade(18);
const transition5 = freeStyleTransition.energeticSlide('from-left', 18);

const sequenceDurations = addTransitionHandles(SCENE_DURATIONS, [
  transition1.timing.getDurationInFrames({fps: 30}),
  transition2.timing.getDurationInFrames({fps: 30}),
  transition3.timing.getDurationInFrames({fps: 30}),
  transition4.timing.getDurationInFrames({fps: 30}),
  transition5.timing.getDurationInFrames({fps: 30}),
]);

export const VideoContent: React.FC<{slug: string}> = ({slug}) => (
  <FreeStyleLayout slug={slug} background={COLORS.bg} subtitleAccent={COLORS.cyan} subtitleFontSize={34}>
    <Audio src={staticFile(`${slug}/voice.mp3`)} />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={sequenceDurations[0]} premountFor={30}><Scene1BlackHoleHook /></TransitionSeries.Sequence>
      <TransitionSeries.Transition {...transition1} />
      <TransitionSeries.Sequence durationInFrames={sequenceDurations[1]} premountFor={30}><Scene2PerseusCluster /></TransitionSeries.Sequence>
      <TransitionSeries.Transition {...transition2} />
      <TransitionSeries.Sequence durationInFrames={sequenceDurations[2]} premountFor={30}><Scene3AudioFilterDashboard /></TransitionSeries.Sequence>
      <TransitionSeries.Transition {...transition3} />
      <TransitionSeries.Sequence durationInFrames={sequenceDurations[3]} premountFor={30}><Scene4GasWavefront /></TransitionSeries.Sequence>
      <TransitionSeries.Transition {...transition4} />
      <TransitionSeries.Sequence durationInFrames={sequenceDurations[4]} premountFor={30}><Scene5PitchShift /></TransitionSeries.Sequence>
      <TransitionSeries.Transition {...transition5} />
      <TransitionSeries.Sequence durationInFrames={sequenceDurations[5]} premountFor={30}><Scene6Listen slug={slug} /></TransitionSeries.Sequence>
    </TransitionSeries>
  </FreeStyleLayout>
);
