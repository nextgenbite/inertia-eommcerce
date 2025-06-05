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
    }
}
