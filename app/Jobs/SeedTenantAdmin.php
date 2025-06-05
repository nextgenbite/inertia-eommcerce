<?php

namespace App\Jobs;

use App\Models\Account;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SeedTenantAdmin implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Tenant $tenant;
    /**
     * Create a new job instance.
     */
    public function __construct(Tenant $tenant)
    {
       $this->tenant =$tenant;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->tenant->run(function(){
            $account = Account::create(['name' => $this->tenant->company_name]);
            User::create([
                'account_id' => $account->id,
                'first_name' => $this->tenant->first_name,
                'last_name' => $this->tenant->last_name,
                'email' => $this->tenant->email,
                'password' => $this->tenant->password,
                'owner' => true,
             ]);
        });
    }
}
