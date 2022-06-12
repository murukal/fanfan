export enum AppID {
  Boomemory = 'boomemory',
  Boomoney = 'boomoney',
}

export const AppLocation = {
  [AppID.Boomemory]: 'http://localhost:9100',
  [AppID.Boomoney]: 'http://localhost:9300',
};
