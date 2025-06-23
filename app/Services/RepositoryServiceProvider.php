<?php

namespace App\Services;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
         //Expense category
         $this->app->bind(
            'App\Repositories\Interfaces\Expense\CategoryInterface',
            'App\Repositories\Expense\CategoryRepository'
        );
         //Expense
         $this->app->bind(
            'App\Repositories\Interfaces\Expense\ExpenseInterface',
            'App\Repositories\Expense\ExpenseRepository'
        );
         //category
         $this->app->bind(
            'App\Repositories\Interfaces\Product\CategoryInterface',
            'App\Repositories\Product\CategoryRepository'
        );
         //sub_category
         $this->app->bind(
            'App\Repositories\Interfaces\Product\SubCategoryInterface',
            'App\Repositories\Product\SubCategoryRepository'
        );
         //sub_sub_category
         $this->app->bind(
            'App\Repositories\Interfaces\Product\SubSubCategoryInterface',
            'App\Repositories\Product\SubSubCategoryRepository'
        );
         //brand
         $this->app->bind(
            'App\Repositories\Interfaces\Product\BrandInterface',
            'App\Repositories\Product\BrandRepository'
        );
         //unit
         $this->app->bind(
            'App\Repositories\Interfaces\Product\UnitInterface',
            'App\Repositories\Product\UnitRepository'
        );
         //Promotion
         $this->app->bind(
            'App\Repositories\Interfaces\Promotion\PromotionInterface',
            'App\Repositories\Promotion\PromotionRepository'
        );
         //product
         $this->app->bind(
            'App\Repositories\Interfaces\Product\ProductInterface',
            'App\Repositories\Product\ProductRepository'
        );
         //Order
         $this->app->bind(
            'App\Repositories\Interfaces\Order\OrderInterface',
            'App\Repositories\Order\OrderRepository'
        );
         //Warehouse
         $this->app->bind(
            'App\Repositories\Interfaces\Warehouse\WarehouseInterface',
            'App\Repositories\Warehouse\WarehouseRepository'
        );

            //Slider
         $this->app->bind(
            'App\Repositories\Interfaces\Slider\SliderInterface',
            'App\Repositories\Slider\SliderRepository'
        );
    }
}
