#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================
## user_problem_statement: "Clone https://genesys-showcase.preview.emergentagent.com/ look & feel (layout, theme, copy) onto the existing Genesys Info X site; include section videos; apply same design system to Technology/Healthcare/Semiconductors pages."
## frontend:
##   - task: "Reference showcase clone (homepage + vertical pages)"
##     implemented: true
##     working: true
##     file: "frontend/src/pages/HomePage.js + frontend/src/pages/*Page.js + frontend/src/App.css"
##     stuck_count: 1
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         - working: "NA"
##           agent: "main"
##           comment: "Rebuilt app routing; created HomePage and IndustryPage template; matched reference section structure & copy; added autoplay muted loop videos in hero + spotlight cards + industry page hero; restyled App.css to dark enterprise glass panels; updated index.css to not override theme. Needs e2e verification of nav hash scrolling, card hover, forms POST /api/contact, and page routes."
##         - working: false
##           agent: "testing"
##           comment: "CRITICAL ISSUE: All Pixabay video URLs return 404 errors (hero video + 3 spotlight videos + 3 industry page videos). This breaks the visual experience. WORKING: Dark enterprise theme renders correctly, header navigation scrolls to sections (6/7 work), industry pages load with proper routing (/technology, /healthcare, /semiconductors), back-to-home navigation works, contact form submits successfully to /api/contact, newsletter subscription works. The core functionality is solid but video assets need replacement." 
##         - working: "NA"
##           agent: "main"
##           comment: "Fixed broken video sources by swapping Pixabay/Pexels URLs (403/404 due to hotlink protection) to public commondatastorage.googleapis.com MP4s (ForBiggerBlazes/Escapes/Joyrides/Meltdowns). Also improved anchor scroll positioning via scroll-margin-top on .section + .hero and fixed Reveal margin slightly. Fixed invalid closing tag on IndustryPage header CTA. Needs retest to confirm videos load + nav anchors behave."
##         - working: true
##           agent: "testing"
##           comment: "COMPREHENSIVE TESTING COMPLETED - ALL MAJOR ISSUES RESOLVED! ✅ Hero video loads from Google Cloud Storage (no longer Pixabay) with autoplay/muted/loop attributes. ✅ All 3 spotlight videos load from Google Cloud Storage with proper attributes. ✅ All 7 header navigation anchors work correctly (Spotlight, Tech Stack, Industries, Who we are, Capabilities, Case Studies, FAQ). ✅ All 3 industry pages (/technology, /healthcare, /semiconductors) load correctly with Google Cloud Storage hero videos. ✅ All 'Talk to an Expert' CTAs work without console errors. ✅ Newsletter and Contact forms submit successfully to /api/contact. ✅ No console errors or network 404/403 errors found. Minor: Videos appear paused due to browser autoplay policies, but this is expected behavior and doesn't affect functionality."
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 1
##   run_ui: true
## test_plan:
##   current_focus:
##     - "Reference showcase clone (homepage + vertical pages)"
##   stuck_tasks: []
##   test_all: false
##   test_priority: "high_first"
## agent_communication:
##     - agent: "main"
##       message: "Please run Playwright e2e on homepage + /technology,/healthcare,/semiconductors. Verify header nav anchors scroll to sections, video elements load, hover interactions, newsletter + contact forms submit (POST /api/contact), and no console errors."
##     - agent: "testing"
##       message: "TESTING COMPLETED - Found critical video loading issues but core functionality works. All Pixabay video URLs return 404 errors. Header navigation works (6/7 sections scroll correctly). Industry pages load properly with hero videos and back-to-home navigation. Contact and newsletter forms submit successfully to /api/contact endpoint. Dark enterprise theme renders correctly. Need to fix video URLs for full functionality."