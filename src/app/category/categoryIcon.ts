import { VideoCategoryType } from '../shared/enums/video-category-type';

const GENERIC_MOVIE_ICON = '<i class="fas fa-film"></i>';
const GENERIC_MUSIC_ICON = '<i class="fas fa-music"></i>';
const GENERIC_VIDEO_ICON = '<i class="fas fa-play-circle"></i>';

const categoriesIcons = new Map<VideoCategoryType, string>();
categoriesIcons.set(VideoCategoryType["Action/Adventure"], GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType["Anime/Animation"], GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType["Autos & Vehicles"], '<i class="fas fa-truck-monster"></i>');
categoriesIcons.set(VideoCategoryType["Classics"], GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType["Comedy"], '<i class="fas fa-grin-beam"></i>');
categoriesIcons.set(VideoCategoryType["Documentary"], GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType["Drama"], '<i class="fas fa-sad-cry"></i>');
categoriesIcons.set(VideoCategoryType["Education"], '<i class="fas fa-graduation-cap"></i>');
categoriesIcons.set(VideoCategoryType.Entertainment, GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType.Family, GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType["Film & Animation"], GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType.Foreign, GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType.Gaming, '<i class="fas fa-gamepad"></i>');
categoriesIcons.set(VideoCategoryType.Horror, '<i class="fas fa-grimace"></i>');
categoriesIcons.set(VideoCategoryType["Howto & Style"], GENERIC_VIDEO_ICON);
categoriesIcons.set(VideoCategoryType.Movies, GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType.Music, GENERIC_MUSIC_ICON);
categoriesIcons.set(VideoCategoryType["News & Politics"], '<i class="far fa-newspaper"></i>');
categoriesIcons.set(VideoCategoryType["Nonprofit & Activism"], '<i class="fas fa-hand-holding-medical"></i>');
categoriesIcons.set(VideoCategoryType["People & Blogs"], '<i class="fas fa-user-clock"></i>');
categoriesIcons.set(VideoCategoryType["Pets & Animals"], '<i class="fas fa-paw"></i>');
categoriesIcons.set(VideoCategoryType["Sci-Fi/Fantasy"], '<i class="fas fa-space-shuttle"></i>');
categoriesIcons.set(VideoCategoryType["Science & Technology"], '<i class="fas fa-flask"></i>');
categoriesIcons.set(VideoCategoryType["Short Movies"], GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType["Sports"], '<i class="fas fa-baseball-ball"></i>');
categoriesIcons.set(VideoCategoryType["Shorts"], GENERIC_VIDEO_ICON);
categoriesIcons.set(VideoCategoryType["Shows"], GENERIC_VIDEO_ICON);
categoriesIcons.set(VideoCategoryType["Thriller"], GENERIC_MOVIE_ICON);
categoriesIcons.set(VideoCategoryType["Trailers"], GENERIC_VIDEO_ICON);
categoriesIcons.set(VideoCategoryType["Travel & Events"], GENERIC_VIDEO_ICON);
categoriesIcons.set(VideoCategoryType["Videoblogging"], GENERIC_VIDEO_ICON);

Object.freeze(categoriesIcons);
Object.seal(categoriesIcons);

export default categoriesIcons;
