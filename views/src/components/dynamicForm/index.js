import { eventFormConfig } from './eventFormConfig';
import { famFormConfig } from './famFormConfig';
import { orgFormConfig } from './orgFormConfig';
import { peopleFormConfig } from './peopleFormConfig';
import { placeFormConfig } from './placeFormConfig';
import { thingFormConfig } from './thingFormConfig';
import { defaultConfig } from './defaultConfig';

export {
    eventFormConfig,
    famFormConfig,
    orgFormConfig,
    peopleFormConfig,
    placeFormConfig,
    thingFormConfig,
    defaultConfig,
}

export const formConfigMap = {
    event: eventFormConfig,
    family: famFormConfig,
    organization: orgFormConfig,
    person: peopleFormConfig,
    place: placeFormConfig,
    thing: thingFormConfig
};