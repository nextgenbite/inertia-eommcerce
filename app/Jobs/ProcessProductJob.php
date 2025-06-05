<?php

namespace App\Jobs;

use App\Traits\ProductsTrait;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;


class ProcessProductJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, ProductsTrait;

    protected $woocommerce;

    /**
     * Create a new job instance.
     */
    public function __construct($woocommerce)
    {
        $this->woocommerce = $woocommerce;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            // Initialize variables for pagination
            $page = 1;
            $perPage = 100; // Adjust as needed

            // Process products in batches
            do {
                // Fetch products for the current page
                $products = $this->woocommerce->get('products', ['page' => $page, 'per_page' => $perPage]);

                // Process each product
                foreach ($products as $item) {
                    // Process the product
                    $this->processProduct($item);
                }

                // Increment page number for next request
                $page++;
                
            } while (!empty($products));

            // // Dispatch success event
            // event(new ProcessProductJob('success'));
            // event(new ProcessProductSuccess('Data Inserted Successfully'));
        } catch (\Exception $e) {
            // Dispatch error event
            event(new ProcessProductJob('error', $e->getMessage()));
        }
    }
     /**
     * Handle a job success.
     *
     * @return void
     */
    public function onSuccess()
    {
        // This method will be called when the job is successfully processed
        // You can perform any action you want here, such as logging or sending notifications
        // Flash success message to the session
  session()->flash('message', 'Data Updated Successfully');
  session()->flash('alert-type', 'success');
        // For example, logging the success:
        \Log::info('Data Inserted successfully');
    }
}