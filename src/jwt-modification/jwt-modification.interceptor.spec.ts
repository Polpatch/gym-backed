import { JwtModificationInterceptor } from './jwt-modification.interceptor';

describe('JwtModificationInterceptor', () => {
  it('should be defined', () => {
    expect(new JwtModificationInterceptor()).toBeDefined();
  });
});
