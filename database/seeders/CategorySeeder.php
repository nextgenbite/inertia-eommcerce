<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
public function run(): void
    {
        // Disable foreign key checks for clean truncate
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('sub_sub_categories')->truncate();
        DB::table('sub_categories')->truncate();
        DB::table('categories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Seed Categories
 $categories = DB::table('categories')->whereNull('slug')->orWhere('slug', '')->get();

        foreach ($categories as $category) {
            $slug = Str::slug($category->title);

            // Ensure unique slug (optional: append ID if conflict)
            $existing = DB::table('categories')->where('slug', $slug)->where('id', '!=', $category->id)->exists();
            if ($existing) {
                $slug .= '-' . $category->id;
            }

            DB::table('categories')->where('id', $category->id)->update([
                'slug' => $slug,
            ]);

            // Seed Sub Categories
            for ($i = 1; $i <= 2; $i++) {
                $subTitle = "{$category->title} Sub $i";
                $subSlug = Str::slug($subTitle);
                $subCategory = DB::table('sub_categories')->insertGetId([
                    'category_id' => $category->id,
                    'title' => $subTitle,
                    'slug' => $subSlug,
                    'thumbnail' => null,
                    'status' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Seed Sub Sub Categories
                for ($j = 1; $j <= 2; $j++) {
                    $subSubTitle = "$subTitle SubSub $j";
                    $subSubSlug = Str::slug($subSubTitle);
                    DB::table('sub_sub_categories')->insert([
                        'sub_category_id' => $subCategory,
                        'title' => $subSubTitle,
                        'slug' => $subSubSlug,
                        'thumbnail' => null,
                        'status' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}
