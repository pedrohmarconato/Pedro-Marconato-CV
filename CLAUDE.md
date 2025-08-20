# Claude.md - Memory File

## Pipeline MCP Requirements

**IMPORTANTE - NO FALLBACKS OR SIMULATIONS:**
- User explicitly does NOT want any fallback mechanisms in step1_brand_research.py
- User explicitly does NOT want any simulations or fake data
- User wants Claude CLI to work properly within step1
- Focus on fixing the actual Claude CLI integration, not creating workarounds

## Current Issues
- Claude CLI timeout in step1_brand_research.py when called from venv environment
- Need to resolve Claude CLI execution without fallbacks
- Must make the real Claude CLI work within the pipeline

## User Preferences
- No fallbacks allowed
- No simulations allowed  
- Fix the real problem, don't work around it
- Pipeline must use actual Claude CLI successfully