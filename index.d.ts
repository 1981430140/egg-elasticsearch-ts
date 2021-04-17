import "egg";
import * as elasticsearch from '@elastic/elasticsearch';

declare module "egg" {
    interface Application {
        elasticsearch: elasticsearch.Client;
    }

    interface Context {
        elasticsearch: elasticsearch.Client;
    }

    interface EggAppConfig {
        elasticsearch: elasticsearch.ClientOptions;
    }
    
}
