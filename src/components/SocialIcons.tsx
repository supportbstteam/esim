import { IconType } from "react-icons";

import {
  RiFacebookFill,
  RiTwitterXFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiLinkedinFill,
  RiPinterestFill,
  RiSnapchatFill,
  RiRedditFill,
  RiTumblrFill,
  RiVimeoFill,
  RiTiktokFill,
  RiDiscordFill,
  RiTelegramFill,
} from "react-icons/ri";

import {
  FaWhatsapp,
  FaGithub,
  FaGitlab,
  FaBitbucket,
  FaMedium,
  FaQuora,
  FaStackOverflow,
  FaDribbble,
  FaBehance,
  FaFigma,
  FaSlack,
  FaSpotify,
  FaSoundcloud,
  FaTwitch,
  FaFacebookMessenger,
} from "react-icons/fa";

import {
  SiThreads,
  SiKakaotalk,
  SiLine,
  SiWechat,
  SiSignal,
  SiSky,
} from "react-icons/si";

import { MdEmail } from "react-icons/md";


export const iconMap: Record<string, IconType> = {

  // Meta
  Facebook: RiFacebookFill,
  Instagram: RiInstagramFill,
  Threads: SiThreads,
  Whatsapp: FaWhatsapp,
  Messenger: FaFacebookMessenger,

  // Twitter / X
  Twitter: RiTwitterXFill,
  X: RiTwitterXFill,

  // Professional
  Linkedin: RiLinkedinFill,
  LinkedIn: RiLinkedinFill,

  // Video platforms
  Youtube: RiYoutubeFill,
  Vimeo: RiVimeoFill,
  Tiktok: RiTiktokFill,
  Twitch: FaTwitch,

  // Chat platforms
  Telegram: RiTelegramFill,
  Discord: RiDiscordFill,
  Skype: SiSky,
  Signal: SiSignal,
  Line: SiLine,
  Wechat: SiWechat,
  KakaoTalk: SiKakaotalk,

  // Developer platforms
  Github: FaGithub,
  Gitlab: FaGitlab,
  Bitbucket: FaBitbucket,
  StackOverflow: FaStackOverflow,

  // Content platforms
  Medium: FaMedium,
  Reddit: RiRedditFill,
  Quora: FaQuora,
  Tumblr: RiTumblrFill,

  // Design platforms
  Dribbble: FaDribbble,
  Behance: FaBehance,
  Figma: FaFigma,

  // Music platforms
  Spotify: FaSpotify,
  Soundcloud: FaSoundcloud,

  // Visual platforms
  Pinterest: RiPinterestFill,
  Snapchat: RiSnapchatFill,

  // Work platforms
  Slack: FaSlack,

  // Email
  Email: MdEmail,
  Gmail: MdEmail,
};