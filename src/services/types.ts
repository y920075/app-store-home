interface ITunesStoreFeed {
  feed: {
    author: {
      name: { label: string };
      uri: { label: string };
    };
    entry: IAppEntry[];
    updated: { label: string };
    rights: { label: string };
    title: { label: string };
    icon: { label: string };
    link: Link[];
    id: { label: string };
  };
}

interface IAppEntry {
  "im:name": { label: string };
  "im:image": Image[];
  summary: { label: string };
  "im:price": {
    label: string;
    attributes: { amount: string; currency: string };
  };
  "im:contentType": { attributes: { term: string; label: string } };
  rights: { label: string };
  title: { label: string };
  link: Link | Link[];
  id: {
    label: string;
    attributes: { "im:id": string; "im:bundleId": string };
  };
  "im:artist": {
    label: string;
    attributes: { href: string };
  };
  category: {
    attributes: {
      "im:id": string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  "im:releaseDate": {
    label: string;
    attributes: { label: string };
  };
}

interface Image {
  label: string;
  attributes: { height: string };
}

interface Link {
  attributes: {
    rel: string;
    type?: string;
    href: string;
    title?: string;
    "im:assetType"?: string;
  };
  "im:duration"?: { label: string };
}

interface IAppInfoResponse {
  resultCount: number;
  results: AppInfo[];
}

interface AppInfo {
  screenshotUrls: string[];
  ipadScreenshotUrls: string[];
  appletvScreenshotUrls: string[];
  artworkUrl60: string;
  artworkUrl512: string;
  artworkUrl100: string;
  advisories: string[];
  features: string[];
  supportedDevices: string[];
  isGameCenterEnabled: boolean;
  artistViewUrl: string;
  kind: string;
  averageUserRating: number;
  trackCensoredName: string;
  languageCodesISO2A: string[];
  fileSizeBytes: string;
  formattedPrice: string;
  contentAdvisoryRating: string;
  userRatingCountForCurrentVersion: number;
  trackViewUrl: string;
  trackContentRating: string;
  averageUserRatingForCurrentVersion: number;
  trackId: number;
  trackName: string;
  releaseNotes: string;
  releaseDate: string;
  sellerName: string;
  genreIds: string[];
  bundleId: string;
  isVppDeviceBasedLicensingEnabled: boolean;
  currentVersionReleaseDate: string;
  primaryGenreName: string;
  primaryGenreId: number;
  sellerUrl: string;
  version: string;
  wrapperType: string;
  currency: string;
  description: string;
  minimumOsVersion: string;
  artistId: number;
  artistName: string;
  genres: string[];
  price: number;
  userRatingCount: number;
}

export type { ITunesStoreFeed, IAppInfoResponse, IAppEntry };
