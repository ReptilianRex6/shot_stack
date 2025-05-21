import json

def transform_fonts(input_path="src/lib/google-fonts.json", output_path="src/lib/font-items.json"):
    """
    Transforms the Google Fonts JSON from jonathantneal/google-fonts-complete
    into a simple list of {label, value} objects.
    """
    try:
        with open(input_path, 'r', encoding='utf-8') as f_in:
            google_fonts_data = json.load(f_in)

        font_items = []
        if isinstance(google_fonts_data, dict):
            for font_family in google_fonts_data.keys():
                font_items.append({"label": font_family, "value": font_family})
        
        # Sort alphabetically by label for better UX
        font_items.sort(key=lambda x: x["label"])

        with open(output_path, 'w', encoding='utf-8') as f_out:
            json.dump(font_items, f_out, indent=2)
            
        print(f"Successfully transformed fonts. Output saved to {output_path}")
        print(f"Found {len(font_items)} fonts.")

    except FileNotFoundError:
        print(f"Error: Input file not found at {input_path}. "
              "Please ensure you have downloaded google-fonts.json to that location.")
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {input_path}. "
              "Please ensure it's a valid JSON file.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    transform_fonts() 