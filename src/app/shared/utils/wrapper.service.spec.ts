import { WrapperService } from './wrapper.service';
import {LoaderService} from "../services/loader.service";

describe('WrapperService', () => {
  it('should create an instance', () => {
    expect(new WrapperService(new LoaderService())).toBeTruthy();
  });
});
