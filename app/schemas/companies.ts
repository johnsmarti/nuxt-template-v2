import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(1, 'O nome da empresa é obrigatório'),
  cnpj: z.string().min(14, 'O CNPJ deve ter 14 caracteres'),
  description: z.string().optional(),
  segment: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido'),
  website: z.string().url('URL inválida').optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  logo_url: z.string().url('URL inválida').optional(),
});

export type Company = z.infer<typeof companySchema>;