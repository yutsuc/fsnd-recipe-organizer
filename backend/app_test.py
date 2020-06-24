import unittest
import json
from app import app
from models import setup_db, Recipe

jwt_admin = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZyaldpbFVLR1NFQ1pqUmZ3Uml6aCJ9.eyJpc3MiOiJodHRwczovL2pjaGVuYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZWYyY2ZmNzhmNjg1NzAwMTNlM2MzYWIiLCJhdWQiOlsiaHR0cDovLzEyNy4wLjAuMTo1MDAwIiwiaHR0cHM6Ly9qY2hlbmFwcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTkyOTcyOTM0LCJleHAiOjE1OTMwNTkzMzQsImF6cCI6IjJ0U2ZWemp6RDJkYXZUOExMVDI5N3ppdkJIeDczUEpSIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpyZWNpcGUiLCJnZXQ6cmVjaXBlcy1kZXRhaWwiLCJwYXRjaDpyZWNpcGVzIiwicG9zdDpyZWNpcGUiXX0.kVnvYrUXDinP_DX62H_aU_3tCmqXqBmTGfoLm2u3Lkhm5fL3qV3X4ml-l9-8j5plb2HM3n7qTWb8LXb8_MZ1CELY4IFwFyCbsIIST3a597Pu1fwqaIQuTtMApH15xmO4lN3w1Jg0go-yPK-5bLxStKQ7VRhyzVVbFciWo75crEW52dqKbApXc-4cmpQVH9quZvRzM0xXIOJVeJxcAOMGsjHtvgxzRn_trMVWKr1phzNGE4RVCFQvPtMZb31WZ5qYH-1j6pH5XifP_fDv6OxUg1eMcpXM4Wfmhz1Tu5OdX3rI_sLGBEFALxFKRDAWjqSYT__RqEBAjsk-okQCBG-oUA"


class TestCases(unittest.TestCase):
    def setUp(self):
        """Define test variables and initialize app."""
        self.app = app
        self.client = self.app.test_client
        setup_db(self.app)

        self.new_recipe = {
            "recipe": {
                "recipeTitle": "Pancakes",
                "ingredients": [
                    {"name": "pancake mix", "quantity": 1, "unit": "cup"},
                    {"name": "water or milk", "quantity": "2/3", "unit": "cup"}
                ],
                "instructions": "Whisk together pancake mix and water. Let batter sit for 2 minutes. Heat pancake griddle to 375F. Pour in batter. Cook for 1-1.5 minutes per side"
            },
            "owner": "owner@recipeowner.com"
        }

        self.new_invalid_recipe = {
            "recipe": {
                "ingredients": [
                    {"name": "pancake mix", "quantity": 1, "unit": "cup"}
                ],
                "instructions": ""
            },
            "owner": "owner@recipeowner.com"
        }

        self.update_recipe = {
            "recipeTitle": "Dough(updated)",
            "ingredients": [
                {"name": "flour", "quantity": "400", "unit": "g"},
                {"name": "instant yeast", "quantity": "1", "unit": "tsp"},
                {"name": "water", "quantity": "100", "unit": "g"}
            ],
            "instructions": "Mix all together"
        }

        self.update_invalid_recipe = {
            "ingredients": [
                {"name": "flour", "quantity": "400", "unit": "g"},
                {"name": "instant yeast", "quantity": "1", "unit": "tsp"},
                {"name": "water", "quantity": "100", "unit": "g"}
            ],
        }

    def tearDown(self):
        """Executed after reach test"""
        pass

    def test_retrieve_recipes(self):
        res = self.client().get("/recipes")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["recipes"])

    def test_retrieve_recipes_detail(self):
        res = self.client().get("/recipes-detail", headers={
            'Authorization': 'Bearer ' + jwt_admin,
        },)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["recipes"])

    def test_401_if_retrieve_recipes_detail_with_invalid_token(self):
        res = self.client().get("/recipes-detail", headers={
            'Authorization': 'Bearer somedummytoken',
        })
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)

    def test_create_recipe(self):
        count_before = Recipe.query.count()
        res = self.client().post("/recipes", json=self.new_recipe, headers={
            'Authorization': 'Bearer ' + jwt_admin,
        })
        data = json.loads(res.data)
        count_after = Recipe.query.count()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertEqual(count_before + 1, count_after)

    def test_422_if_create_recipe_with_invalid_recipe(self):
        res = self.client().post("/recipes", json=self.new_invalid_recipe, headers={
            'Authorization': 'Bearer ' + jwt_admin,
        })
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "unprocessable")

    def test_update_recipe(self):
        count_before = Recipe.query.count()
        res = self.client().patch("/recipes/1", json=self.update_recipe, headers={
            'Authorization': 'Bearer ' + jwt_admin,
        })
        data = json.loads(res.data)
        count_after = Recipe.query.count()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertEqual(count_before, count_after)
        self.assertTrue(data["recipe"])

    def test_404_if_update_not_existing_recipe(self):
        res = self.client().patch("/recipes/100000", json=self.update_recipe, headers={
            'Authorization': 'Bearer ' + jwt_admin,
        })
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "not found")

    def test_422_if_update_recipe_with_invalid_recipe(self):
        res = self.client().patch("/recipes/1", json=self.update_invalid_recipe, headers={
            'Authorization': 'Bearer ' + jwt_admin,
        })
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "unprocessable")

    def test_delete_recipe(self):
        res = self.client().delete("/recipes/2", headers={
            'Authorization': 'Bearer ' + jwt_admin,
        })
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertEqual(data["delete"], 2)

    def test_404_if_delete_not_existing_recipe(self):
        res = self.client().delete("/recipes/100000", headers={
            'Authorization': 'Bearer ' + jwt_admin,
        })
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "not found")


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
