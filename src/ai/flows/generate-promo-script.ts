// src/ai/flows/generate-promo-script.ts
'use server';

/**
 * @fileOverview AI-powered promotional script generator.
 *
 * This file defines a Genkit flow that uses an LLM to generate promotional scripts based on user-provided keywords.
 *
 * @remarks
 *   - generatePromoScript - The main function to generate a promotional script.
 *   - GeneratePromoScriptInput - The input type for the generatePromoScript function, including keywords.
 *   - GeneratePromoScriptOutput - The output type for the generatePromoScript function, providing the generated script.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the promo script generator
const GeneratePromoScriptInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords to base the promotional script on, separated by commas.'),
});

export type GeneratePromoScriptInput = z.infer<typeof GeneratePromoScriptInputSchema>;

// Define the output schema for the promo script generator
const GeneratePromoScriptOutputSchema = z.object({
  script: z.string().describe('The generated promotional script.'),
});

export type GeneratePromoScriptOutput = z.infer<typeof GeneratePromoScriptOutputSchema>;

// Exported function to generate the promo script
export async function generatePromoScript(input: GeneratePromoScriptInput): Promise<GeneratePromoScriptOutput> {
  return generatePromoScriptFlow(input);
}

// Define the prompt for generating the promo script
const generatePromoScriptPrompt = ai.definePrompt({
  name: 'generatePromoScriptPrompt',
  input: {schema: GeneratePromoScriptInputSchema},
  output: {schema: GeneratePromoScriptOutputSchema},
  prompt: `You are an AI assistant specialized in generating promotional scripts.

  Based on the following keywords, generate a short and engaging promotional script:

  Keywords: {{{keywords}}}
  `,
});

// Define the Genkit flow for generating the promo script
const generatePromoScriptFlow = ai.defineFlow(
  {
    name: 'generatePromoScriptFlow',
    inputSchema: GeneratePromoScriptInputSchema,
    outputSchema: GeneratePromoScriptOutputSchema,
  },
  async input => {
    const {output} = await generatePromoScriptPrompt(input);
    return output!;
  }
);
