export interface StreamState {
    playing: boolean;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number | undefined | any;
    currentTime: number | undefined | any;
    canplay: boolean;
    error: boolean;
    event:string
  }
  