export const COLORS = {
  bg: '#02040A',
  text: '#F1F6FF',
  muted: '#8291AA',
  cyan: '#53DDF3',
  blue: '#4A77FF',
  purple: '#A166FF',
  red: '#FF315B',
};

export const SCENE_DURATIONS = [177, 166, 180, 159, 117, 159] as const;
export const TOTAL_FRAMES = SCENE_DURATIONS.reduce((sum, duration) => sum + duration, 0);
