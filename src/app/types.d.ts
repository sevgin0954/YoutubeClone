import { PageArguments } from "./shared/arguments/page-arguments";
import { Video } from "./models/video/video";
import { ServiceModel } from "./models/service-models/service-model";
import { Observable } from "rxjs";

type loadVideosCallback = (filterArgument: any, pageArgs: PageArguments, resources: any[])
  => Observable<ServiceModel<Video[]>>;
