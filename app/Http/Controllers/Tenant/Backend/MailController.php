<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Traits\ImageUploadTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use BeyondCode\Mailbox\Facades\Mailbox;
use BeyondCode\Mailbox\InboundEmail;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;
use Webklex\IMAP\Facades\Client;
use Illuminate\Support\Collection;
class MailController extends Controller
{
    use ImageUploadTrait;
    public $title = ['Mail', 'mail'];
    private $imagePath = 'upload/mail/';

    public function setup()
    {
        $title = $this->title;
        $data = [
            'imap_username' => config('imap.accounts.default.username'),
            'imap_password' => config('imap.accounts.default.password'),
            'imap_host' => config('imap.accounts.default.host'),
            'imap_port' => config('imap.accounts.default.port'),
            'imap_protocol' => config('imap.accounts.default.protocol'),
            'imap_encryption' => config('imap.accounts.default.encryption'),
            'imap_validate_cert' => config('imap.accounts.default.validate_cert'),
            'imap_authentication' => config('imap.accounts.default.authentication'),
        ];
        return view('backend.email.setup', compact('data', 'title'));
    } // End Method
    public function inbox()
    {
        // Create a new instance of the IMAP client
        $client = Client::account('default');
        $client->connect();

        // Check if the connection is successful
        if (!$client->isConnected()) {
            return 'Not connected';
        }

        // Retrieve all folders from the mailbox
        $folders = $client->getFolders();

        // Define an array to store all messages
        $allMessages = [];

        // Loop through every mailbox
        foreach ($folders as $folder) {
            // Get all messages of the current mailbox
            $messages = $folder->messages()->all()->get();

            // Add messages to the array
            foreach ($messages as $message) {
                $date = Carbon::parse($message->getDate());

                // Check if the date is today
                if ($date->isToday()) {
                    $formattedDate = $date->format('h:i A');
                } else {
                    $formattedDate = $date->format('j M');
                }
                $allMessages[] = [
                    'id' => $message->getUid(),
                    'from' => $message->getFrom()[0]->mail,
                    'subject' => $message->getSubject(),
                    'attachments_count' => $message->getAttachments()->count(),
                    'html_body' => $message->getTextBody(),
                    'date' => $formattedDate,
                    'is_read' => $message->getFlags()
                ];
            }
        }

        // Paginate the messages
        $perPage = 10; // Change this as per your requirement
        $currentPage = request()->input('page') ?? 1;
        $messagesSlice = array_slice($allMessages, ($currentPage - 1) * $perPage, $perPage);

        $path = route('mail.inbox'); // Update the route name if necessary

        $paginator = new LengthAwarePaginator(
            $messagesSlice,
            count($allMessages),
            $perPage,
            $currentPage,
            ['path' => $path]
        );

        // Return the paginated messages to the view
        $title = $this->title;
        return view('backend.email.inbox', compact('title', 'paginator'));
    }



        public function compose()
        {
            $title = $this->title;
            $data =Customer::latest()->get();
            return view('backend.email.compose ', compact('title', 'data'));
        } // End Method


    public function read($id)
    {
        $title = $this->title;
        $client =Client::account('default');
               // Connect to the IMAP server
               $client->connect();

               // Get the mailbox
        // Get the INBOX folder
        $mailbox = $client->getFolder('INBOX');

        // Get the email with the provided UID
        $data = $mailbox->query()->where('uid', $id)->get()->first();
        return view('backend.email.read ', compact('title', 'data'));
    } // End Method

    public function deletes(Request $request)
    {
        return $request->all();
        // Create a new instance of the IMAP client
        $client = Client::account('default');

        // Connect to the IMAP server
        $client->connect();

        // Check if the connection is successful
        if (!$client->isConnected()) {
            // Handle connection error
            $notification = [
                'message' => 'Failed to connect to the mail server.',
                'alert-type' => 'error'
            ];
            return redirect()->back()->with($notification);
        }

        // Get the INBOX folder
        $mailbox = $client->getFolder('INBOX');

        // Get the selected message IDs from the request
        $selectedMessages = $request->input('selected_messages', []);

        // Loop through the selected message IDs and delete them
        foreach ($selectedMessages as $messageId) {
            // Find the message with the provided UID
            $message = $mailbox->query()->where('uid', $messageId)->get()->first();

            // Check if the message exists
            if ($message) {
                // Delete the message from the server
                $message->delete($expunge = true);
            } else {
                // Handle the case where the message is not found
                $notification = [
                    'message' => 'Message with UID ' . $messageId . ' not found.',
                    'alert-type' => 'error'
                ];
                return redirect()->back()->with($notification);
            }
        }

        // If all messages are successfully deleted, redirect back with success message
        $notification = [
            'message' => 'Data deleted successfully.',
            'alert-type' => 'success'
        ];
        return redirect()->back()->with($notification);
    }


}
