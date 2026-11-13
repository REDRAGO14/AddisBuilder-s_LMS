import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '../schemas';

describe('Auth Zod Validation Schemas', () => {
  it('validates correct login credentials', () => {
    const valid = { email: 'student@aau.edu', password: 'password123' };
    const res = loginSchema.safeParse(valid);
    expect(res.success).toBe(true);
  });

  it('rejects invalid email formats', () => {
    const invalid = { email: 'invalid-email', password: 'password123' };
    const res = loginSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('rejects passwords shorter than 6 characters', () => {
    const invalid = { email: 'student@aau.edu', password: '123' };
    const res = loginSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('validates matching registration passwords', () => {
    const valid = {
      fullName: 'Abebe Kebede',
      email: 'abebe@aau.edu',
      password: 'secretPassword',
      confirmPassword: 'secretPassword',
      role: 'LEARNER' as const,
    };
    const res = registerSchema.safeParse(valid);
    expect(res.success).toBe(true);
  });

  it('rejects mismatched registration passwords', () => {
    const invalid = {
      fullName: 'Abebe Kebede',
      email: 'abebe@aau.edu',
      password: 'secretPassword',
      confirmPassword: 'differentPassword',
      role: 'LEARNER' as const,
    };
    const res = registerSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });
});
