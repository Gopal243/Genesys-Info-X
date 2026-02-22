import requests
import sys
import json
from datetime import datetime

class GenesysInfoXAPITester:
    def __init__(self, base_url="https://cinematic-enterprise.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}" if endpoint else f"{self.base_url}/api"
        if not headers:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    print(f"   Response Text: {response.text[:100]}...")
                    return True, response.text
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'test': name,
                    'endpoint': endpoint,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'error': response.text[:200]
                })
                return False, response.text

        except requests.exceptions.Timeout:
            print(f"❌ FAILED - Request timed out")
            self.failed_tests.append({
                'test': name,
                'endpoint': endpoint,
                'error': 'Request timeout'
            })
            return False, "Timeout"
        except Exception as e:
            print(f"❌ FAILED - Error: {str(e)}")
            self.failed_tests.append({
                'test': name,
                'endpoint': endpoint,
                'error': str(e)
            })
            return False, str(e)

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "message": "Test message from automated testing suite. This is to verify the contact form is working properly."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST", 
            "contact",
            200,
            data=test_data
        )

    def test_get_contact_messages(self):
        """Test retrieving contact messages"""
        return self.run_test(
            "Get Contact Messages",
            "GET",
            "contact",
            200
        )

    def test_status_creation(self):
        """Test status check creation"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        
        return self.run_test(
            "Create Status Check",
            "POST",
            "status", 
            200,
            data=test_data
        )

    def test_get_status_checks(self):
        """Test retrieving status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

    def test_contact_validation(self):
        """Test contact form with invalid data"""
        invalid_data = {
            "email": "invalid-email",
            "message": "Test message"
        }
        
        # This should fail validation
        success, _ = self.run_test(
            "Contact Form Validation (Invalid Email)",
            "POST",
            "contact",
            422,  # Expecting validation error
            data=invalid_data
        )
        return success

    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("🚀 GENESYS INFO X API TESTING SUITE")
        print("=" * 60)
        
        # Test basic connectivity
        self.test_root_endpoint()
        
        # Test contact endpoints
        self.test_contact_submission()
        self.test_get_contact_messages()
        
        # Test status endpoints  
        self.test_status_creation()
        self.test_get_status_checks()
        
        # Test validation
        self.test_contact_validation()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"   - {test['test']}: {test.get('error', 'Unknown error')}")
        
        return len(self.failed_tests) == 0

def main():
    """Main test execution"""
    tester = GenesysInfoXAPITester()
    
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 ALL TESTS PASSED! API is working correctly.")
        return 0
    else:
        print(f"\n⚠️  {len(tester.failed_tests)} TEST(S) FAILED. Please check the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())