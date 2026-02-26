import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/archai/decision-engine";
import { analyzeConstraints } from "@/lib/archai/constraint-analyzer";
import { createSuccessResponse, createErrorResponse } from "@/types/api";
import { BlueprintInputSchema } from "@/db/schema";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedInput = BlueprintInputSchema.parse(body);
    
    // Analyze constraints to get advisory
    const advisory = analyzeConstraints(validatedInput);

    // Generate architecture blueprint
    const blueprint = await generateBlueprint(validatedInput, advisory);

    return NextResponse.json(createSuccessResponse(blueprint));
    
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        createErrorResponse(
          "Invalid input data", 
          "VALIDATION_ERROR", 
          error.format()
        ),
        { status: 400 }
      );
    }

    return NextResponse.json(
      createErrorResponse("An unexpected error occurred", "INTERNAL_SERVER_ERROR"),
      { status: 500 }
    );
  }
}
