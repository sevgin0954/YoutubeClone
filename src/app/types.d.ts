import { PageArguments } from "./shared/arguments/page-arguments";
import { Video } from "./models/video/video";
import { ServiceModel } from "./models/service-models/service-model";
import { Observable } from "rxjs";

type EnumType = {
  [num: number]: string;
}

type loadVideosCallback = (pageArgs: PageArguments, resources: any[])
  => Observable<ServiceModel<Video[]>>;
